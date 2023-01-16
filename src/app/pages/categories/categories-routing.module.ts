import { CategoryListComponent } from './category-list/category-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryFormComponent } from './category-form/category-form.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent
  },
  {
    path: 'new',
    component: CategoryFormComponent
  },
  {
    path: ':id/edit',
    component: CategoryFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }

//Esse arquivo será o gerador raiz das rotas;
//Por estarmos usando uma arquitetura que todas as rotas vão comeceçar
//com categories (app-routing-module.ts), nós não precisamos passa-lo novamente no path
//Ex: nomesite.com/categories => list(master);
// nomesite.com/categories/new => form (detail);
// nomesite.com/categories/:id/edit => form (detail);
