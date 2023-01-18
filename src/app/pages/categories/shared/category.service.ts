import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
// tratamento de erros 
import {map, catchError, flatMap} from 'rxjs/operators';

import { Category } from './category.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = "api/categories";

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Category[]> {

    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  } 

  getById(id: number): Observable<Category> {
    // Montando a url que vai buscar uma categoria pelo id
    const url = `${this.apiPath}/${id}`;

   return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  create(category: Category): Observable<Category> {
    // Fazendo a criação de uma categoria / category -> obj body da rota
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  update(category: Category): Observable<Category> {
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

  // Métodos privados
  //************************************************/
  // Ele vai receber do servidor, um array de objetos com as categorias,
  // onde será convertido para categoria.
  private jsonDataToCategories(jsonData: any[]): Category[] {
    // Aqui o array está vazio, e ele será alimentado pelo forEach com a categoria
    const categories: Category[] = [];
    jsonData.forEach(element => categories.push(element as Category));

    return categories;
  }

  // Retornando apenas uma categoria, por não ser um array
  // ele retorna um objeto do tipo any.
  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
  }

  private handleError(error: any): Observable<any> {
    console.log(`ERRO NA REQUISIÇÃO -> ${error}`)

    return throwError(error);
  }

}
