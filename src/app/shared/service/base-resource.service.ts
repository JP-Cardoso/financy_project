import { BaseResourceModel } from "../models/base-resource.model";

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// tratamento de erros
import {map, catchError} from 'rxjs/operators';

export abstract class BaseResourceService <T extends BaseResourceModel>{


  getAll(): Observable<T[]> {

    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }

  getById(id: number): Observable<T> {
    // Montando a url que vai buscar uma categoria pelo id
    const url = `${this.apiPath}/${id}`;

   return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  create(category: T): Observable<T> {
    // Fazendo a criação de uma categoria / category -> obj body da rota
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  update(category: T): Observable<T> {
    const url = `${this.apiPath}/${category.id}`;
    // Passando a url + o objeto que será atualizado essas infos, viram do front
    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      // Por conta do in-memory na atualização ele não retorna nada, por isso não será tratado
      // ou seja aqui retornamos o mesmo objeto.
      map(() => category)
    )
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

}
