import { Component, Input, SimpleChange } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Filter } from '../model/filter';
import { TreeViewFilter } from '../model/filter';

//Import - Angular2 Log Services
//import { Logger } from "angular2-logger/core";
//import * as ng2log from 'angular2-logger/core';

import { ChartComponent, Highcharts } from 'angular2-highcharts';
require('highcharts/modules/exporting.js')(Highcharts);
require('highcharts/modules/export-csv.js')(Highcharts);


import { ConfigDataService } from '../services/configdata.service'
import { KeyValueData } from '../model/key-value';
import { KeyValueObject } from '../model/key-value';
import { StaticDataService } from '../services/staticdata.service';
import { GlobalDataService } from '../services/globaldata.service';



@Component({
    moduleId: module.id,
    selector: 'chart-column-area',
    styles: [`
      chart {
        display: block;
        height:200px;
      }
    `],
    templateUrl: `./charts-column.component.html`,
    providers: [StaticDataService, ConfigDataService, GlobalDataService]
})
export class ChartComponent_Column {
    @Input() currentFilters: TreeViewFilter;
    @Input() component_context: string;
    ObjFilter: Filter;

    chartConfigItems: any;
    title = '';
    chartContextData: KeyValueObject;

    constructor(private _globalDataService: GlobalDataService, private _configService: ConfigDataService, private dataService: StaticDataService) {
        //constructor(private _logger: ng2log.Logger) {
        //this._logger.error('This is a priority level 1 error message...');
        //this._logger.warn('This is a priority level 2 warning message...');
        //this._logger.info('This is a priority level 3 warning message...');
        //this._logger.debug('This is a priority level 4 debug message...');
        //this._logger.log('This is a priority level 5 log message...');
        //let myValidator = new ng2log.Logger();
        //myValidator.info('ChartComponent_Column1111 - Logger loaded');
        //this._logger.info('ChartComponent_Column - Logger loaded');

    }

    ngOnInit() {
        this.loadConfigItems();
    }

    ngAfterViewInit() {
        this.getDataAndRenderChart(this.ObjFilter.id);
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        let isFirstTime = !(this.ObjFilter);
        let log: string[] = [];
        for (let propName in changes) {
            if (propName == "currentFilters") {
                let changedProp = changes[propName];
                this.ObjFilter = changedProp.currentValue;
                if (!isFirstTime) {
                    this.getDataAndRenderChart(this.ObjFilter.id);
                }
            }
            else {
                let changedProp = changes[propName];
                let from = JSON.stringify(changedProp.currentValue);
            }
        }

    }


    loadConfigItems() {
        let configItems: any = this._globalDataService.getModuleConfigItems();
        if (this.component_context === "sps-overview-wellEvents") {
            this.chartConfigItems = configItems.overview_WellEvents_Config;
        }
        else {
            this.chartConfigItems = configItems.lossGain_FieldLossGain_Config;
        }
        this.title = this.chartConfigItems.title;
    }

    getDataAndRenderChart(filterId: number) {
        this.dataService.get_columnChart_Data(this.component_context, filterId).then(resultData => {
            this.chartContextData = resultData;
            this.renderChart();
        });
    }

    //Chart functionality - Start
    renderChart() {
        console.log('renderChart renderChart renderChart');
        let data: Array<KeyValueData>;
        if (this.chartContextData != null) {
            data = this.chartContextData.data;
        }
        else {
            data = [];
        }

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
                enabled: false,
                filename: this.title,
                type: "image/png",
                buttons: {
                    exportButton: {
                        enabled: false
                    },
                    printButton: {
                        enabled: false
                    }
                }
            },
            series: [{
                name: this.chartConfigItems.yAxisTitle,
                data: data.map(function (point) {
                    return [point.key, point.value]
                })
            }]
        }

    }

    options: Object;
    chartInstance: HighchartsChartObject;

    saveInstance(chartInstance: HighchartsChartObject) {
        this.chartInstance = chartInstance;
    }


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

    onClickIcons(exportType: string): void {
        //console.log(this.chartInstance);
        if (exportType) {
            if (this.chartContextData != null) {
                this.renderChart();
                var exportOptions = { type: exportType, filename: this.title };
                if (exportType == 'application/vnd.ms-excel') {
                    let tempChartInstance: any = this.chartInstance;
                    tempChartInstance.downloadXLS(exportOptions);
                }
                else {
                    this.chartInstance.exportChart(exportOptions);
                }
            }
        }
    }

    //Chart functionality - End

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/