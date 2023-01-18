import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/category.models';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  
  
  alert(arg0: string) {
    throw new Error('Method not implemented.');
  }
  edit: any|string;

  categories: Category[] = []
  constructor( 
    private categoryService: CategoryService
  ) {

  }
  
  ngOnInit(): void {
    // Aqui ele está pegando a lista de categorias e as exibindo
   this.categoryService.getAll().subscribe(
    categories => this.categories = categories,
    error => this.alert('Erro ao carregar a lista')
   )
  }

  // Remoção de um item da lista
  deleteCategory(category:any) {
    const mustDelete = confirm('Deseja realmente excluir este item');
    
    if(mustDelete) {
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element != category),
        () => this.alert('Erro ao tentar excluir')
      )
    }
    
  }

}
