import { Component } from '@angular/core';

import { Category } from '../shared/category.models';
import { CategoryService } from '../shared/category.service';

import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceListComponent<Category>{
  
  constructor(
    //Aqui é uma injeção de depêndecia
    private categoryService: CategoryService
  ) {
    super(categoryService, )
  }

}
