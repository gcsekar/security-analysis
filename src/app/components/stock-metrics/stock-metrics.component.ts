import { Component, OnInit } from '@angular/core';
import { StocktwitService } from 'app/services/stocktwit.service';

@Component({
  selector: 'app-stock-metrics',
  templateUrl: './stock-metrics.component.html',
  styleUrls: ['./stock-metrics.component.css']
})
export class StockMetricsComponent implements OnInit {

  constructor(_stockTwitService: StocktwitService) { 

  }

  ngOnInit() {
  }

}
