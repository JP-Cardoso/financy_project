import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Animações do angular
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {HttpClientModule} from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Interceptador http do angular. Ele fará o papel de mostrar
// para o angular, que a API está interna e não externa
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from './in-memory-database';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
