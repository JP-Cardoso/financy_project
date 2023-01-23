import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { EntriesRoutingModule } from './entries-routing.module';

import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

//Para todos os modulos que você for utilizar alguma customização de terceiros
//você deve importar aqui - isso vale para os demais cursos
import {CalendarModule} from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';


@NgModule({
  declarations: [
    EntryListComponent,
    EntryFormComponent

  ],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule
  ]
})
export class EntriesModule { }
