import { Component, Input, SimpleChange } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Filter } from '../model/filter';
import { TreeViewFilter } from '../model/filter';

import { KeyValueObject } from '../model/key-value';
import { KeyValueDataArray } from '../model/key-value';
import { KeyValueDataArrayObject } from '../model/key-value';

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
    chartContextData: KeyValueDataArrayObject;


    constructor(private _globalDataService: GlobalDataService, private _configService: ConfigDataService, private dataService: StaticDataService) {

    }

    ngOnInit() {
        this.chartConfigItems = this._globalDataService.getModuleConfigItems();
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

    //Chart functionality - Start
    getDataAndRenderChart(filterId: number) {
        this.dataService.get_columnSplineChart_Data(this.component_context, filterId).then(resultData => {
            this.chartContextData = resultData;
            this.renderChart();
        });
    }

    renderChart() {

        let seriesData: any = [];
        if (this.chartContextData != null) {
            seriesData = this.chartContextData.collection.map(function (point: any) {
                return [];
            })
        }
        

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
            yAxis: [{ // Primary yAxis
                lineWidth: 1,
                title: {
                    text: 'Downtime Hours/Well Count'
                }

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
            series: seriesData
            

        };

        if (this.chartContextData != null) {
            var index: number = 0;
            for (let object of this.chartContextData.collection) {
                let cData: any = this.chartContextData.collection[index];
                let tempOptions: any = this.options;
                tempOptions.series[index] = ({
                    name: cData.properties.seriesName,
                    type: cData.properties.chartType,
                    yAxis: cData.properties.yAxis,
                    color: cData.properties.color,
                    tooltip: {
                        valueSuffix: ' ' + cData.properties.displayUnit
                    },
                    data: cData.data.map(function (point: any) {
                        return [point.key, point.value]
                    })
                });
                //console.log(tempOptions.series[index]);
                index++;
            }
        }
        else {
            let tempOptions: any = this.options;
            tempOptions.series[0] = ({
                name: "No data available",
                data: []
            });
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