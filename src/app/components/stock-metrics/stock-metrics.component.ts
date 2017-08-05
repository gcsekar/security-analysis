import { Component, Input, Output, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StocktwitService } from 'app/services/stocktwit.service';
import { UtilitiesModule } from 'app/libraries/utilities/utilities.module';

@Component( {
    selector: 'app-stock-metrics',
    templateUrl: './stock-metrics.component.html',
    styleUrls: ['./stock-metrics.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})

export class StockMetricsComponent implements OnInit {
    @Input() stockData: any;
    _stockTwitService: StocktwitService;
    @Output() positives: number = 0;
    @Output() negatives: number = 0;
    private _utitities: UtilitiesModule = new UtilitiesModule;
    
    
    /**
     *  Default constructor 
     */
    constructor( _stockTwitService: StocktwitService ) {
        var parent = this;
        this._stockTwitService = _stockTwitService;
        this._stockTwitService.stockDataChange.subscribe( function( data ) {
            parent.stockData = JSON.parse(data);
            parent.updateCount();
        });
    }

    updateCount() {
        if ( this.stockData ) {
            this.positives = this._utitities.getCount(this.stockData, 'stock_trend', 'Positive');
            this.negatives = this._utitities.getCount(this.stockData, 'stock_trend', 'Negative');
        }
    }

    getCount( field, compare ) {
        var count = 0;
        var data = this.stockData ;
        for ( var i = 0; i < data.length; i++ ) {
            var item = data[i];
            if ( item[field] == compare ) {
                count++;
            }
        }
        return count;
    }



    ngOnInit() {

    }

    ngOnDestroy() {
        //        this._stockTwitService.stockDataChange.unsubscribe();
    }

}
