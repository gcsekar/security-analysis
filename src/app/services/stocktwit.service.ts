import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class StocktwitService {
    private token;
    private stockData: any;
    stockDataChange: Subject<any> = new Subject<any>();

    constructor( private _http: Http ) {

    }

    getTrend = function( callback ) {
        var url = "http://localhost:3000/scrape";
        this._http.get( url )
            .subscribe( function( data ) {
                callback( data._body );
            },
            function( error ) {
                console.log( error );
                callback( error );
            }
         );
    }

    getQuotesData = function( symbolList, callback ) {
        var parent = this;
        var url = "http://localhost:3000/scrape/quotes";
        var params = new URLSearchParams;
        params.set( 'symbols', symbolList );
        this._http.get( url, { search: params })
            .subscribe( function( data ) {
                parent.stockDataChange.next( data._body );
                callback( data._body );
            },
            function( error ) {
                console.log( error );
                callback( error );
            })
    }

}
