import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
// tratamento de erros
import {map, catchError, flatMap} from 'rxjs/operators';

import { Entry } from './entry.model';

// Para deixar visivel para toda a aplicação
@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries";

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Entry[]> {

    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    )
  }

  getById(id: number): Observable<Entry> {
    // Montando a url que vai buscar uma categoria pelo id
    const url = `${this.apiPath}/${id}`;

   return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  create(entry: Entry): Observable<Entry> {
    // Fazendo a criação de uma categoria / entry -> obj body da rota
    return this.http.post(this.apiPath, entry).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;
    // Passando a url + o objeto que será atualizado essas infos, viram do front
    return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      // Por conta do in-memory na atualização ele não retorna nada, por isso não será tratado
      // ou seja aqui retornamos o mesmo objeto.
      map(() => entry)
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
  private jsonDataToEntries(jsonData: any[]): Entry[] {
    // Aqui o array está vazio, e ele será alimentado pelo forEach com a categoria
    const entries: Entry[] = [];
    jsonData.forEach(element => entries.push(element as Entry));

    return entries
  }

  // Retornando apenas uma categoria, por não ser um array
  // ele retorna um objeto do tipo any.
  private jsonDataToEntry(jsonData: any): Entry {
    return jsonData as Entry;
  }

  private handleError(error: any): Observable<any> {
    console.log(`ERRO NA REQUISIÇÃO -> ${error}`)

    return throwError(error);
  }

}
