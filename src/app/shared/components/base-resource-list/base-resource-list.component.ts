import { OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';



export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  //Esse cara vai receber todas aa despesas e receitas
  resources: T[] = [];
    alert: any;

  constructor(
    //Aqui é uma injeção de depêndecia
    private resourceService: BaseResourceService<T>
  ) {

  }

  ngOnInit(): void {
    // Aqui ele está pegando a lista de categorias e as exibindo
   this.resourceService.getAll().subscribe(
    resources => this.resources = resources.sort((a:any, b:any) => b.id - a.id),
    error => this.alert('Erro ao carregar a lista')
   )
  }

  // Remoção de um item da lista
  deleteResource(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir este item');

    if(mustDelete) {
      this.resourceService.delete(Number(resource.id)).subscribe(
        () => this.resources = this.resources.filter((element) => element != resource),
        () => this.alert('Erro ao tentar excluir')
      )
    }

  }

}