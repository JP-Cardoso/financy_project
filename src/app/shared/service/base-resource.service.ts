import { BaseResourceModel } from "../models/base-resource.model";

import { Injector } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// tratamento de erros
import {map, catchError} from 'rxjs/operators';

export abstract class BaseResourceService <T extends BaseResourceModel> {

  protected http!: HttpClient;

  constructor(
    protected apiPath: string,    
    protected injector: Injector
  ) {
    this.http = injector.get(HttpClient)
  }


  getAll(): Observable<T[]> {

    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResources)
    )
  }

  getById(id: number): Observable<T> {
    // Montando a url que vai buscar uma categoria pelo id
    const url = `${this.apiPath}/${id}`;

   return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    )
  }

  create(resource: T): Observable<T> {
    // Fazendo a criação de uma categoria / resource -> obj body da rota
    return this.http.post(this.apiPath, resource).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    )
  }

  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;
    // Passando a url + o objeto que será atualizado essas infos, viram do front
    return this.http.put(url, resource).pipe(
      catchError(this.handleError),
      // Por conta do in-memory na atualização ele não retorna nada, por isso não será tratado
      // ou seja aqui retornamos o mesmo objeto.
      map(() => resource)
    )
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }


   // Métodos protegidos
  //************************************************/
  // Ele vai receber do servidor, um array de objetos com as categorias,
  // onde será convertido para categoria.
  protected jsonDataToResources(jsonData: any[]): T[] {
    // Aqui o array está vazio, e ele será alimentado pelo forEach com a categoria
    const resources: T[] = [];
    jsonData.forEach(element => resources.push(element as T));

    return resources;
  }

  // Retornando apenas uma categoria, por não ser um array
  // ele retorna um objeto do tipo any.
  protected jsonDataToResource(jsonData: any): T {
    return jsonData as T;
  }

  protected handleError(error: any): Observable<any> {
    console.log(`ERRO NA REQUISIÇÃO -> ${error}`)

    return throwError(error);
  }

}
