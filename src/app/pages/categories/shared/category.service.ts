import { Injectable, Injector } from '@angular/core';
import { Category } from './category.models';

import { BaseResourceService } from 'src/app/shared/service/base-resource.service';

// Para deixar visivel para toda a aplicação
@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category> {

  constructor(
   protected override injector: Injector

  ) { 
    super("api/categories", injector)  
  } 

}
