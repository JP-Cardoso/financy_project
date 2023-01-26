import {OnInit, AfterContentChecked, Injector } from '@angular/core';
// Tudos os imports que vão mexer com o formulário
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
// Todos os imports para questão de rotas
import { ActivatedRoute, Router } from '@angular/router';
// Um operador do rxjs
import { switchMap } from 'rxjs/operators';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../service/base-resource.service';

import * as toastr from 'toastr';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked{

  currentAction!: string;
  resourceForm!: FormGroup;
  pageTitle!: string;
  serverErrorMessage!: string[];
  submittingForm: boolean = false;
  
  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T, //no category form vou passar um new Category
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData:any) => T

  ){
    this.route = this.injector.get(ActivatedRoute)
    this.router = this.injector.get(Router)
    this.formBuilder = this.injector.get(FormBuilder)
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    // Quando o usuario clicar em salvar
    this.submittingForm = true;
    if(this.currentAction == 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  // protected methods
  protected setCurrentAction() {
    // Aqui ele retorna um array com a rota a partir do caminho base
    this.route.snapshot.url[0].path == 'new' ? this.currentAction = 'new' : this.currentAction = 'edit'
  }


  protected loadResource() {
    // Virfica a ação atual
    if(this.currentAction == 'edit') {
      // Fazer uma req no server, para trazer a categoria que está sendo editada.
      // O paramMap é um observable
      this.route.paramMap.pipe(
        switchMap(params => (this.resourceService.getById(Number(params.get("id")))))
      )
      .subscribe( //Subscrevendo algo que veio da requisição.
        (resource) => {
          this.resource = resource;
          // Setando um novo formulário de categoria
          this.resourceForm.patchValue(this.resource);
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde')
      )
    }
  }

  protected setPageTitle() {
    if(this.currentAction == 'new') {
      this.pageTitle = this.creationPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle()
    }
  }

  protected creationPageTitle(): string {
    return 'Novo'
  }

  protected editionPageTitle(): string {
    return 'Edição'
  }

  protected createResource() {
    // Ele vai criar um obj do tipo Category, e enviar essa categoria atráves do service
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value)
    this.resourceService.create(resource).subscribe(
      resource => this.actionsForSuccess(resource),
      error=> this.actionsForError(error)
    )

  }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.update(resource).subscribe(
      resource => this.actionsForSuccess(resource),
      error=> this.actionsForError(error)
    )
  }

  protected actionsForSuccess(resource: T) {
    toastr.success("Solicitação processada com sucesso");
    const baseComponentPath = String(this.route.snapshot.parent?.url[0].path);

    // redirect/reload component page
    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
      () => this.router.navigate([baseComponentPath, resource.id, "edit"])
    )
    /*
    nomedosite.com/categories/new
    nomedosite.com/categories/
    nomedosite.com/categories/:id/edit
    O skipLocationChange indica, para não adicionar essa navegação para o categories no histórico de navegação
    */
  }

  protected actionsForError(error: any) {
    toastr.error("Ocorreu um erro ao processar a sua solicitação");
    this.submittingForm = false;

    if(error.status == 422) {
      //Retorna um array com a menssagem de erros
      this.serverErrorMessage = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessage = ["Falha na comunicação com o servidor. Por favor, tente mais tarde"]
    }

  }

  protected abstract buildResourceForm(): void [
    
  ]
}
