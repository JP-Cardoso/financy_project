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
    super("api/entries", injector )
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


  // Métodos privados
  //************************************************/
  // Ele vai receber do servidor, um array de objetos com as categorias,
  // onde será convertido para categoria.
  protected jsonDataToEntries(jsonData: any[]): Entry[] {
   
    // Aqui o array está vazio, e ele será alimentado pelo forEach com as entradas
    const entries: Entry[] = [];
    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });

    return entries;
  }

  // Retornando apenas uma categoria, por não ser um array
  // ele retorna um objeto do tipo any.
  protected jsonDataToEntry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }



}
