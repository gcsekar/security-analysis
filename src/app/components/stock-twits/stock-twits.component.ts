import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { DatePipe, CurrencyPipe, PercentPipe } from '@angular/common';
import { StocktwitService } from 'app/services/stocktwit.service';
import { StockMetricsComponent } from 'app/components/stock-metrics/stock-metrics.component';
import { SortBy } from 'app/pipes/sort.pipe';


import { Observable, Subscription } from 'rxjs/Rx';
@Component( {
    selector: 'app-stock-twits',
    templateUrl: './stock-twits.component.html',
    styleUrls: ['./stock-twits.component.css']
})

export class StockTwitsComponent implements OnInit {   
    private trendTicks;
    private tickQuotes;
    private sub: Subscription;
    private timer;
    private timer_status: boolean = false;
    private working: boolean = false;
    private last_updated: Date = null;
    private parent;

    private ticks = 0;
    constructor( private _stocktwit: StocktwitService ) {
        //        this.parent = this.parent;
        this.refreshData( _stocktwit, this.refreshStatus );
        this.startTimer();
    }

    ngOnInit() {
        this.parent = this;
    }
    private startTimer() {
        this.parent = this;
        this.timer = Observable.timer( 5000, 5000 );
        this.sub = this.timer.subscribe( t => this.refreshData( this._stocktwit, this.refreshStatus ) );
    }
    private stopTimer() {
        this.timer = Observable.timer( 5000, 5000 );
        this.sub.unsubscribe();
    }
    private refreshData( _stocktwit: StocktwitService, callback ) {
        this.working = true;
        this.timer_status = !this.working;
        this.trendTicks = [];
        var parent = this;
        _stocktwit.getTrend( function( data ) {
            try {
                parent.trendTicks = JSON.parse( data );
                _stocktwit.getQuotesData( parent.trendTicks.toString(), function( data ) {
                    parent.tickQuotes = JSON.parse( data );
                    callback( "Success", parent );
                });
            }
            catch ( e ) {
                callback( e, null );
            }
        });
    }

    private refreshStatus( data, parent ) {
        parent.working = false;
        parent.timer_status = !parent.working;
        parent.last_updated = new Date( Date.now() );
    }


    private ngOnDestroy() {
        this.stopTimer();
    }

    private isPositive( trend ) {
        if ( trend == 'Postive' )
            return true;
        else
            return false;
    }
    
    private isNegative( trend ) {
        if ( trend == 'Postive' )
            return false;
        else
            return true;
    }
    
    private getCssBasedOnTrend(trend){
        let cssClasses;
        if (trend == "Positive"){
            cssClasses = {
                    'success':true
            }
        }
        else{
            cssClasses = {
                    'danger':true
            }
        }
    }
}

