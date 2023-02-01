import { Category } from "../../categories/shared/category.models";
import { BaseResourceModel } from "src/app/shared/models/base-resource.model";

export class Entry extends BaseResourceModel{
  constructor(
    public override id?: number,
    public name?: string,
    public description?: string,
    public type?: string, //Se vai dizer se é dispesa ou entrada
    public amount: string = '',
    public date?: string,
    public paid?: boolean,
    public categoryId?: number,
    public category?: Category
  ) {
    super()
  }

  // Quando for exibir os lançamentos

  static types = {
    expense: 'Despesa',
    renevue: 'Receita'
  };

  static fromJson(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  get paidText(): string {
   return this.paid ? 'Pago' : 'Pendente';
  }
}
