import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
//import { AppRoutingModule } from './routing/app-routing.module';


import { StocktwitService } from './services/stocktwit.service';
import { StockTwitsComponent } from './components/stock-twits/stock-twits.component';

@NgModule( {
    declarations: [
        AppComponent,
//        AppRoutingModule,
        StockTwitsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    providers: [StocktwitService],
    bootstrap: [AppComponent]
})
export class AppModule { }
