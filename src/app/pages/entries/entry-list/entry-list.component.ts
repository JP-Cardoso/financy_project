import { Component, OnInit } from '@angular/core';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {


  alert(arg0: string) {
    throw new Error('Method not implemented.');
  }
  edit: any|string;
  //Esse cara vai receber todas aa despesas e receitas
  entries: Entry[] = [];

  constructor(
    //Aqui é uma injeção de depêndecia
    private entryService: EntryService
  ) {

  }

  ngOnInit(): void {
    // Aqui ele está pegando a lista de categorias e as exibindo
   this.entryService.getAll().subscribe(
    entries => this.entries = entries.sort((a:any, b:any) => b.id - a.id),
    error => this.alert('Erro ao carregar a lista')
   )
  }

  // Remoção de um item da lista
  deleteEntry(entry:any) {
    const mustDelete = confirm('Deseja realmente excluir este item');

    if(mustDelete) {
      this.entryService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element != entry),
        () => this.alert('Erro ao tentar excluir')
      )
    }

  }

}
