import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class StocktwitService {
    private token;
    private Authurl = "http://www.stocktwits.com";
//    private TokenUrl = "http://gcsolution.net:3000/stocktwits/token";
    constructor(  public _http: Http ) {
        this.refreshToken();

    }

    refreshToken() {
        //Http request-
        this._http.get( this.Authurl).subscribe(
            ( response ) => this.processResponse( response ),
            //            ( error ) => this.onGetForecastError( error.json() ),
            //            () => this.onGetForecastComplete()
        );
    }

    getToken = function() {
        return this.token;
    }

    processResponse( data ) {
        console.log( data );
    }

}
