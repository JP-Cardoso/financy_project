import { Category } from "../../categories/shared/category.models";

export class Entry {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public type?: string, //Se vai dizer se é dispesa ou entrada
    public amount?: string,
    public date?: string,
    public paid?: boolean,
    public categoryId?: number,
    public category?: Category
  ) {

  }

  // Quando for exibir os lançamentos

  static types = {
    expense: 'Despesa',
    revenue: 'Receita'
  };

  get paidText(): string {
   return this.paid ? 'Pago' : 'Pendente';
  }
}
