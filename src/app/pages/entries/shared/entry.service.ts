import { Injectable, Injector } from '@angular/core';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';

import { BaseResourceService } from 'src/app/shared/service/base-resource.service';

import { Observable } from 'rxjs';
// tratamento de erros
import {flatMap, catchError, map} from 'rxjs/operators';

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
    return this.setCategoryAndSendToServer(entry, super.create.bind(this))  
  }

  override update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this))   
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<Entry>{
    return this.categoryService.getById(Number(entry.categoryId)).pipe(
      map(category => {
        entry.category = category;
        return sendFn(entry);
      }),
      catchError(this.handleError)
    );
  }
}
