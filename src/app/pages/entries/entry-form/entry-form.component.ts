import { Component, Injector, OnInit } from '@angular/core';
// Tudos os imports que vão mexer com o formulário
import { Validators} from '@angular/forms';
// As classes referentes com o recurso que estamos trabalhando aqui
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { Category } from '../../categories/shared/category.models';
import { CategoryService } from '../../categories/shared/category.service';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry>{
  categories?: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeXeros: true,
    radix: ','
  };


  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }


  constructor(
    protected entryService: EntryService,
    protected categoryService: CategoryService,
    protected override injector: Injector
  ){
   super(injector, new Entry(), entryService, Entry.fromJson)
  }

  override ngOnInit(): void {
    this.loadCategories();
    super.ngOnInit();
  }

  private loadCategories() {
      this.categoryService.getAll().subscribe(
        categories => this.categories = categories
      )
    }

  // Ele vai me retornar um objeto com os parametros que seram exibidos
  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        }
      }
    )
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ["expense", [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]]
    })
  }

 protected override creationPageTitle(): string {
   return 'Cadastro de Novo Lançamento'
 }

 protected override editionPageTitle(): string {
   const categoryName = this.resource.name || '';
   return "Editando um Lançamento"
 }


}
