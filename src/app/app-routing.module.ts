import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//O loadChildren é responsável por renderizar a pagina.
//Porem ele é um submodulo, pois que realmente vai gerar as rotas é o categories.modules.ts.
//nomesite.com/categories => (modulo list) (Master);
//nomesite.com/categories/23 => (modulo form) (Detail);
