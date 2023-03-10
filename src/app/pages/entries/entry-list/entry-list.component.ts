import { Component, Directive } from '@angular/core';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})


export class EntryListComponent extends BaseResourceListComponent<Entry> {


  constructor(
    //Aqui é uma injeção de depêndecia
    private entryService: EntryService
  ) {
    super(entryService)
  }

}
