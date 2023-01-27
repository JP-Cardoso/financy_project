import { Component, Injector } from '@angular/core';
// Tudos os imports que vão mexer com o formulário
import { Validators} from '@angular/forms';
// As classes referentes com o recurso que estamos trabalhando aqui
import { Category } from '../shared/category.models';
import { CategoryService } from '../shared/category.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category>{

  constructor(
    protected categoryService: CategoryService,
    protected override injector: Injector   
  ){
    super(injector, new Category(), categoryService, Category.fromJson)
  }

  protected buildResourceForm() {
    // Construindo o formulŕio da categória.
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    })
  }

  protected override creationPageTitle(): string {
    return 'Cadastro de nova Categoria'
  };

  protected override editionPageTitle(): string {
    const categoryName = this.resource.name || '';
    return `Editando Categoria: ${categoryName}`
  }
}
