import { Component, OnInit } from '@angular/core';
import { StocktwitService } from 'app/services/stocktwit.service';

@Component( {
    selector: 'app-stock-twits',
    templateUrl: './stock-twits.component.html',
    styleUrls: ['./stock-twits.component.css']
})
export class StockTwitsComponent implements OnInit {
    private token;
    constructor( private _stocktwit: StocktwitService ) {
        this.token = _stocktwit.getToken();
    }

    ngOnInit() {

    }

}
