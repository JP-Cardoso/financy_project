import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Category } from '../../categories/shared/category.models';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from '../../entries/shared/entry.model';
import { EntryService } from '../../entries/shared/entry.service';

import * as currencyFormatter from "currency-formatter"

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  // Define o valor base como 0 
  chartOption = {
    scales: {
      yAxes: [
        { ticks: {
           beginAtZero: true
          } 
        }
      ]
    }
  };

  categoires: Category[] = [];
  entries: Entry[] = [];

  @ViewChild('month') month?: ElementRef
  @ViewChild('year') year?: ElementRef

  constructor(
    private categoryService: CategoryService,
    private entryService: EntryService,
  ) {

  }

  ngOnInit() {
    this.categoryService.getAll()
      .subscribe(
        categories => this.categoires = categories
      );
  }

  generateReports() {
    const month = this.month?.nativeElement.value;
    const year = this.year?.nativeElement.value;

    if(!month || !year) {
      alert('Você precisa selecionar o Mês e o Ano para gerar os relatórios')
    
    } else {

      this.entryService.getByMonthAndYear(month, year)
        .subscribe(this.setValues.bind(this))
    }

  }

  private setValues(entries: Entry[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if(entry.type == 'revenue') {
        revenueTotal += Number(entry.amount)
      } else {
        expenseTotal += Number(entry.amount) 
      }
    })

    this.expenseTotal = expenseTotal;
    this.revenueTotal = revenueTotal;

    this.balance = revenueTotal - expenseTotal;
  }

  private setChartData() {
    const chartData = []

    this.categoires.forEach(category => {
      //Filtrar todos os lançamentos pela categoria e tipo
      let filteredEntries = this.entries.filter(
        entry => (entry.categoryId == category.id) && (entry.type == 'revenue')
      );

      // Se por acaso for encontrados lançamneto, some-os e os mostre no gráfico
      if(filteredEntries.length > 0){
        const totalAmount = filteredEntries.reduce(
          (total, entry) => total + currencyFormatter.unformat(entry.amount, { code: 'BRL' }), 0
        )

        chartData.push({
          categoryName: category.name,
          totalAmount: totalAmount
        })
      }
    })



  }


}
