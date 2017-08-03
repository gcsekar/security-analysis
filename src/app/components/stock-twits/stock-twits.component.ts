import { Component, OnInit } from '@angular/core';
import { DatePipe,CurrencyPipe,PercentPipe } from '@angular/common';
import { StocktwitService } from 'app/services/stocktwit.service';
import 'rxjs/Rx';
@Component( {
    selector: 'app-stock-twits',
    templateUrl: './stock-twits.component.html',
    styleUrls: ['./stock-twits.component.css']
})

export class StockTwitsComponent implements OnInit {
    private trendTicks;
    private tickQuotes;
    constructor( private _stocktwit: StocktwitService ) {
        this.trendTicks = [];
        var parent = this;
        _stocktwit.getTrend( function( data ) {
            parent.trendTicks = JSON.parse( data );
            _stocktwit.getQuotesData( parent.trendTicks.toString(), function( data ) {
                parent.tickQuotes = JSON.parse( data );
            });
        });
    }

    ngOnInit() {

    }

}
