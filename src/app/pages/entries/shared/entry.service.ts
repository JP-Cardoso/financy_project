import { Injectable, Injector } from '@angular/core';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';

import { BaseResourceService } from 'src/app/shared/service/base-resource.service';

import { Observable } from 'rxjs';
// tratamento de erros
import {flatMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{
    
  constructor(
    private categoryService: CategoryService,
    protected override injector: Injector
  ) { 
    super("api/entries", injector, Entry.fromJson )
  }

  override create(entry: Entry): Observable<Entry> {

    return this.categoryService.getById(Number(entry.categoryId)).pipe(
      flatMap(category => {
        entry.category = category;

        return super.create(entry);
      })
    )
  }

  override update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(Number(entry.categoryId)).pipe(
      flatMap(category => {
        entry.category = category;

       return super.update(entry)
      })
    )

  }
}
