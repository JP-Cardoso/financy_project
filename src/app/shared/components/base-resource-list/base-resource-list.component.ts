import { OnInit, Directive  } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  //Esse cara vai receber todas aa despesas e receitas
  resources: T[] = [];
    

  constructor(
    //Aqui é uma injeção de depêndecia
    private resourceService: BaseResourceService<T>
  ) {

  }

  ngOnInit(): void {
    // Aqui ele está pegando a lista de categorias e as exibindo
   this.resourceService.getAll().subscribe(
    resources => this.resources = resources.sort((a:any, b:any) => b.id - a.id),
    error => alert('Erro ao carregar a lista')
   )
  }

  // Remoção de um item da lista
  deleteResource(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir este item');

    if(mustDelete) {
      this.resourceService.delete(Number(resource.id)).subscribe(
        () => this.resources = this.resources.filter((element) => element != resource),
        () => alert('Erro ao tentar excluir')
      )
    }

  }

}
