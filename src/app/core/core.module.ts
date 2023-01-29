import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// Interceptador http do angular. Ele fará o papel de mostrar
// para o angular, que a API está interna e não externa
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memory-database';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    RouterModule
  ],
  exports: [
    // Modulos que são compartilhados
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //shared component
    NavbarComponent
  ]
})
export class CoreModule { }
