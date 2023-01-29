import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)
  }, {
    path: 'entries',
    loadChildren: () => import('./pages/entries/entries.module').then(e => e.EntriesModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports.module').then(r => r.ReportsModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//O loadChildren é responsável por renderizar a pagina.
//Porem ele é um submodulo, pois que realmente vai gerar as rotas é o categories-routing.modules.ts.
//nomesite.com/categories => (modulo list) (Master);
//nomesite.com/categories/23 => (modulo form) (Detail);
