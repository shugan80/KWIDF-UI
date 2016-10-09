import { Component, Input, SimpleChange } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Filter } from '../model/filter';
import { TreeViewFilter } from '../model/filter';

import { ChartComponent, Highcharts } from 'angular2-highcharts';
require('highcharts/modules/exporting.js')(Highcharts);
require('highcharts/modules/export-csv.js')(Highcharts);

import { ConfigDataService } from '../services/configdata.service'
import { KeyValueData } from '../model/key-value';
import { StaticDataService } from '../services/staticdata.service';
import { GlobalDataService } from '../services/globaldata.service';

@Component({
    moduleId: module.id,
    selector: 'chart-column-spline-area',
    styles: [`
      chart {
        display: block;
        height:280px;
      }
    `],
    templateUrl: `./charts-column-spline.component.html`,
    providers: [StaticDataService, ConfigDataService, GlobalDataService]
})
export class ChartComponent_ColumnSpline {
    @Input() currentFilters: TreeViewFilter;
    @Input() component_context: string;
    ObjFilter: Filter;

    chartConfigItems: any;
    title = '';

    constructor(private _globalDataService: GlobalDataService, private _configService: ConfigDataService, private dataService: StaticDataService) {

    }

    ngOnInit() {
        this.chartConfigItems = this._globalDataService.getModuleConfigItems();
        this.loadConfigItems();
    }

    ngAfterViewInit() {
        //this.renderChart(this.ObjFilter.id);
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        let isFirstTime = !(this.ObjFilter);
        let log: string[] = [];
        for (let propName in changes) {
            if (propName == "currentFilters") {
                let changedProp = changes[propName];
                this.ObjFilter = changedProp.currentValue;
                if (!isFirstTime) {
                    //this.renderChart(this.ObjFilter.id);
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

    //Chart functionality - Start
    renderChart(filterId: number) {
        this.dataService.get_columnChart_Data(this.component_context, filterId).then(resultData => {
            this.options = {
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: null
                },
                subtitle: {
                    text: null
                },
                xAxis: [{
                    categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    crosshair: true
                }],
                yAxis: [{ // Primary yAxis
                    title: {
                        text: "Downtime Hours/Well Count"
                    },
                    lineWidth: 1
                }, { // Secondary yAxis
                    title: {
                        text: 'Stb/d(1000s)'
                    },
                    lineWidth: 1,
                    opposite: true
                }],
                tooltip: {
                    shared: true
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
                    name: 'DownTime (Hours)',
                    type: 'column',
                    data: [30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
                    tooltip: {
                        valueSuffix: ' hours'
                    }

                }, {
                    name: 'Well Count',
                    type: 'spline',
                    data: [100, 120, 70, 50, 110, 30, 80, 110, 60, 20, 80, 100, 110],
                    tooltip: {
                        valueSuffix: ''
                    }
                },
                {
                    name: 'Lost Production (Stb/d)',
                    type: 'spline',
                    yAxis: 1,
                    data: [0.4, 0.6, 0.8, 0.3, 0.7, 0.6, 0.6, 0.6, 0.6, 0.4, 0.8, 0.3, 0.8],
                    tooltip: {
                        valueSuffix: ' stb/d'
                    }
                }]

            }
        })
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
            //this.renderChart(this.ObjFilter.id);
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

    //Chart functionality - End

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/