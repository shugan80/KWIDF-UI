import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Filter } from '../model/filter';

//Import - Angular2 Log Services
//import { Logger } from "angular2-logger/core";
//import * as ng2log from 'angular2-logger/core';

import { CHART_DIRECTIVES } from 'angular2-highcharts';

import { ConfigDataService } from '../services/configdata.service'
import { KeyValueData } from '../model/key-value';
import { StaticDataService } from '../services/staticdata.service';

@Component({
    moduleId: module.id,
    selector: 'chart-column-area',
    //templateUrl: './charts-column.component.html'
    styles: [`
      chart {
        display: block;
      }
    `],
    template: `<chart [options]="options"></chart>`,
    providers: [StaticDataService, ConfigDataService]
})
export class ChartComponent_Column {
    @Input() filter: Filter;

    public chartConfigItems: any;

    constructor(private _configService: ConfigDataService, private dataService: StaticDataService) {
        //constructor(private _logger: ng2log.Logger) {
        //this._logger.error('This is a priority level 1 error message...');
        //this._logger.warn('This is a priority level 2 warning message...');
        //this._logger.info('This is a priority level 3 warning message...');
        //this._logger.debug('This is a priority level 4 debug message...');
        //this._logger.log('This is a priority level 5 log message...');
        //let myValidator = new ng2log.Logger();
        //myValidator.info('ChartComponent_Column1111 - Logger loaded');
        //this._logger.info('ChartComponent_Column - Logger loaded');

        //this.options = {
        //    title: { text: 'simple chart' },
        //    series: [{
        //        data: [29.9, 71.5, 106.4, 129.2],
        //    }]
        //};
    }

    ngOnInit() {
        this._configService.configJsonPath = '/app/sps/config/sps.config.json';
        this.getConfigItems();
    }

    loadModuleComponents() {
        this.renderChart();
    }

    //Chart functionality - Start
    renderChart() {
        this.dataService.get_columnChart_Data().then(data => {

            let maxYAxisData = this.getMaxData(data);
            this.options = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: (this.chartConfigItems.isTitleVisible) ? this.chartConfigItems.title : null,
                },
                subtitle: {
                    text: this.chartConfigItems.subTitle
                },
                xAxis: {
                    type: 'category',
                    title: {
                        text: this.chartConfigItems.xAxisTitle
                    },
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    max: (maxYAxisData == null) ? null : maxYAxisData.value,
                    title: {
                        text: this.chartConfigItems.yAxisTitle
                    },
                    lineWidth: 1
                },
                legend: {
                    enabled: this.chartConfigItems.isLegendEnabled
                },
                tooltip: {

                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        dataLabels: {
                            enabled: this.chartConfigItems.isDataLabelsEnabled,
                            formatter: function () {
                                return this.y;
                            }
                        }
                    }
                },
                exporting: {
                    enabled: true,
                    filename: "chart",
                    type: "image/png"
                },
                series: [{
                    data: data.map(function (point) {
                        return [point.key, point.value]
                    })
                }]
            }

        });
    }
    options: Object;
    //options: HighchartsOptions;

    getMaxData(dataArray: any) {
        if (dataArray != null && dataArray.length > 0) {
            var res = Math.max.apply(Math, dataArray.map(function (o: any) { return o.value; }));
            var maxObj = dataArray.find(function (o: any) { return o.value == res; });
            return maxObj;
        }
        else {
            return null;
        }
    }

    //Chart functionality - End

    getConfigItems() {
        this._configService.getConfigItems().subscribe(
            items => {
                this.chartConfigItems = items[0].overview_WellEvents_Config
            },
            err => {
                console.error(err);
            },
            () => {
                console.log('done');
                this.loadModuleComponents();
            }
            // No error or completion callbacks here. They are optional, but
            // you will get console errors if the Observable is in an error state.
        );
    }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/