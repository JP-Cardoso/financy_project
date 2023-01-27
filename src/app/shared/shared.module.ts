import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    // Modulos compartilhados
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    //Disponibilizando esse componente
    BreadCrumbComponent,
    PageHeaderComponent 
  ]
})
export class SharedModule { }
