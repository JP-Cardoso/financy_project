import { Component, OnInit, AfterContentChecked } from '@angular/core';

// Tudos os imports que vão mexer com o formulário
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

// Todos os imports para questão de rotas
import { ActivatedRoute, Router } from '@angular/router';

// As classes referentes com o recurso que estamos trabalhando aqui
import { Category } from '../shared/category.models';
import { CategoryService } from '../shared/category.service';

// Um operador do rxjs
import { switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked{

  currentAction!: string;
  categoryForm!: FormGroup;
  pageTitle!: string;
  serverErrorMessage: string[] = [];
  submittingForm: boolean = false;
  category: Category = new Category();


  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,

  ){

  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  // Private methods
  private setCurrentAction() {
    // Aqui ele retorna um array com a rota a partir do caminho base
    this.route.snapshot.url[0].path == 'new' ? this.currentAction = 'new' : this.currentAction = 'edit'
  }

  private buildCategoryForm() {
    // Construindo o formulŕio da categória.
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    })
  }

  private loadCategory() {
    // Virfica a ação atual
    if(this.currentAction == 'edit') {
      // Fazer uma req no server, para trazer a categoria que está sendo editada.
      // O paramMap é um observable
      this.route.paramMap.pipe(
        switchMap(params => (this.categoryService.getById(Number(params.get("id")))))
      )
      .subscribe( //Subscrevendo algo que veio da requisição.
        (category) => {
          this.category = category;
          // Setando um novo formulário de categoria
          this.categoryForm.patchValue(this.category);
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde')
      )
    }
  }

  private setPageTitle() {
    if(this.currentAction == 'new') {
      this.pageTitle = 'Cadastro de Nova Categoria'
    } else {
      const categoryName = this.category.name || ''
      this.pageTitle = `Editando Categoria: ${categoryName}`
    }
  }
}
