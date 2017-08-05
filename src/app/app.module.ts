import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//
import { UtilitiesModule } from './libraries/utilities/utilities.module';

import { AppComponent } from './app.component';
//import { AppRoutingModule } from './routing/app-routing.module';

// Custom Pipes
import { SortBy } from './pipes/sort.pipe';

import { StocktwitService } from './services/stocktwit.service';
import { StockTwitsComponent } from './components/stock-twits/stock-twits.component';
import { StockMetricsComponent } from './components/stock-metrics/stock-metrics.component';

@NgModule( {
    declarations: [
        AppComponent,
        SortBy,
        //        AppRoutingModule,
        StockTwitsComponent,
        StockMetricsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        UtilitiesModule        
    ],
    providers: [StocktwitService],
    bootstrap: [AppComponent]
})
export class AppModule { }
