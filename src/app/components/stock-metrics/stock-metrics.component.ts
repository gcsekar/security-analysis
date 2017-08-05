import { Component, Input, OnChanges, Output, OnInit, ChangeDetectionStrategy, ViewChild, ViewEncapsulation,ElementRef, 
    AfterViewInit} from '@angular/core';

import { StocktwitService } from 'app/services/stocktwit.service';
import { UtilitiesModule } from 'app/libraries/utilities/utilities.module';
import * as d3 from 'd3';

@Component( {
    selector: 'app-stock-metrics',
    templateUrl: './stock-metrics.component.html',
    styleUrls: ['./stock-metrics.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})

export class StockMetricsComponent implements OnInit {
    /*
     * Chart Settings
     */
    @ViewChild( 'barchart' ) private chartContainer: ElementRef;
    private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private colors: any;
    private xAxis: any;
    private yAxis: any;
    private chartData: any = [];

    /*
     * General Settings
     */
    @Input() stockData: any;
    _stockTwitService: StocktwitService;
    @Output() positives: number = 0;
    @Output() negatives: number = 0;
    private _utitities: UtilitiesModule = new UtilitiesModule;
    @Input() showbarchart: boolean = false;

    /**
     *  Default constructor 
     */
    constructor( _stockTwitService: StocktwitService ) {
        var parent = this;
        this._stockTwitService = _stockTwitService;
        this._stockTwitService.stockDataChange.subscribe( function( data ) {
            parent.stockData = JSON.parse( data );
            parent.updateCount();
            if ( this.stockData ) {
                parent.updateChart();
            }            
        });
    }

    updateCount() {
        if ( this.stockData ) {
            this.positives = this._utitities.getCount( this.stockData, 'stock_trend', 'Positive' );
            this.negatives = this._utitities.getCount( this.stockData, 'stock_trend', 'Negative' );
            this.chartData = [
                { 'trend': 0, 'value': this.positives },
                { 'trend': 1, 'value': this.negatives }
            ]
        }
        if ( this.showbarchart ) {

        }
    }

    getCount( field, compare ) {
        var count = 0;
        var data = this.stockData;
        for ( var i = 0; i < data.length; i++ ) {
            var item = data[i];
            if ( item[field] == compare ) {
                count++;
            }
        }
        return count;
    }

    /**
    * 
    */
    createChart() {
        let element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        let svg = d3.select( element ).append( 'svg' )
            .attr( 'width', element.offsetWidth )
            .attr( 'height', element.offsetHeight );

        // chart plot area
        this.chart = svg.append( 'g' )
            .attr( 'class', 'bars' )
            .attr( 'transform', `translate(${this.margin.left}, ${this.margin.top})` );

        // define X & Y domains
        let xDomain = this.chartData.map( d => d[1] );
        let yDomain = [0, 30];

        // create scales
        this.xScale = d3.scaleBand().padding( 0.1 ).domain( xDomain ).rangeRound( [0, this.width] );
        this.yScale = d3.scaleLinear().domain( yDomain );

        // bar colors
        this.colors = d3.scaleLinear().domain( [0, this.chartData.length] ).range( <any[]>['red', 'blue'] );

        // x & y axis
        this.xAxis = svg.append( 'g' )
            .attr( 'class', 'axis axis-x' )
            .attr( 'transform', `translate(${this.margin.left}, ${this.margin.top + this.height})` )
            .call( d3.axisBottom( this.xScale ) );
        this.yAxis = svg.append( 'g' )
            .attr( 'class', 'axis axis-y' )
            .attr( 'transform', `translate(${this.margin.left}, ${this.margin.top})` )
            .call( d3.axisLeft( this.yScale ) );
    }

    /**
     * 
     */
    updateChart() {
        // update scales & axis
        this.xScale.domain( this.chartData.map( d => d[0] ) );
        this.yScale.domain( [0, d3.max( this.chartData, d => d[1] )] );
        this.colors.domain( [0, this.chartData.length] );
        this.xAxis.transition().call( d3.axisBottom( this.xScale ) );
        this.yAxis.transition().call( d3.axisLeft( this.yScale ) );

        let update = this.chart.selectAll( '.bar' )
            .data( this.chartData );

        // remove exiting bars
        update.exit().remove();

        // update existing bars
        this.chart.selectAll( '.bar' ).transition()
            .attr( 'x', d => this.xScale( d[0] ) )
            .attr( 'y', d => this.yScale( d[1] ) )
            .attr( 'width', d => this.xScale.bandwidth() )
            .attr( 'height', d => this.height - this.yScale( d[1] ) )
            .style( 'fill', ( d, i ) => this.colors( i ) );

        // add new bars
        update
            .enter()
            .append( 'rect' )
            .attr( 'class', 'bar' )
            .attr( 'x', d => this.xScale( d[0] ) )
            .attr( 'y', d => this.yScale( 0 ) )
            .attr( 'width', this.xScale.bandwidth() )
            .attr( 'height', 0 )
            .style( 'fill', ( d, i ) => this.colors( i ) )
            .transition()
            .delay(( d, i ) => i * 10 )
            .attr( 'y', d => this.yScale( d[1] ) )
            .attr( 'height', d => this.height - this.yScale( d[1] ) );
    }

    ngOnInit() {
        this.createChart();
    }

    ngOnChange() {
        if ( this.chart ) {
            this.updateChart();
        }
    }
    
    ngAfterViewInit(){
        console.log('on after view init', this.chartContainer);
    }
}


