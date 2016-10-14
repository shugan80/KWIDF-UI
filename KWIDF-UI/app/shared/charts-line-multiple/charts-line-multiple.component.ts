﻿import { Component, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Logger } from "angular2-logger/core";
import { ChartComponent, Highcharts } from 'angular2-highcharts';
require('highcharts/modules/exporting.js')(Highcharts);
require('highcharts/modules/export-csv.js')(Highcharts);

import { Filter } from '../model/filter';
import { TreeViewFilter } from '../model/filter';
import { KeyValueObject } from '../model/key-value';
import { KeyValueDataArray } from '../model/key-value';
import { KeyValueDataArrayObject } from '../model/key-value';
import { KeyValueData } from '../model/key-value';
import { StaticDataService } from '../services/staticdata.service';
import { GlobalDataService } from '../services/globaldata.service';

import { DateFilter } from '../model/filter';
//import { SPS_HistoricProd_DateFilters } from '../../sps/config/sps.config';


@Component({
    moduleId: module.id,
    selector: 'chart-line-multiple',
    styles: [`
      chart {
        display: block;
        height:280px;
      }
    `],
    templateUrl: `./charts-line-multiple.component.html`,
    providers: [StaticDataService, GlobalDataService]
})
export class ChartComponent_LineMultiple {
    @Input() currentFilters: TreeViewFilter;
    @Input() component_context: string;
    @Input() currentControlId: string;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    ObjFilter: Filter;
    chartConfigItems: any;
    title = '';
    chartContextData: KeyValueDataArrayObject;
    chartFilterObject: any;
    chartFilterDefaultSelection: Object;
    chartFilterCurrentSelection: Object;
    
    htmlTable: any;
    tableVisible: any = false;

    displayClass: any = "table";
    tableHidden: any = true;

    @Output() notifyPopup: EventEmitter<string> = new EventEmitter<string>();

    constructor(private _logger: Logger, private _globalDataService: GlobalDataService,
        private dataService: StaticDataService) {
        
    }

    ngOnInit() {
        this.chartConfigItems = this._globalDataService.getModuleConfigItems();
        this.loadConfigItems();
        if (this.component_context === "sps-overview-historicProduction") {
            if (this.chartConfigItems.customFilterEnabled) {
                this.chartFilterObject = this.chartConfigItems.customFilters;
                this.chartFilterDefaultSelection = this.chartConfigItems.customFilters[0].value;
                this.chartFilterCurrentSelection = this.chartFilterDefaultSelection;
            }
        }
    }

    ngAfterViewInit() {
        this.getDataAndRenderChart(this.ObjFilter.id, this.chartFilterCurrentSelection);
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        let isFirstTime = !(this.ObjFilter);
        let log: string[] = [];
        for (let propName in changes) {
            if (propName == "currentFilters") {
                let changedProp = changes[propName];
                this.ObjFilter = changedProp.currentValue;
                if (!isFirstTime) {
                    this.getDataAndRenderChart(this.ObjFilter.id, this.chartFilterCurrentSelection);
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
        if (this.component_context === "sps-overview-historicProduction") {
            this.chartConfigItems = configItems.overview_Historic_Production_Config;
        }
        //else {
        //    this.chartConfigItems = configItems.lossGain_FieldLossGain_Config;
        //}
        this.title = this.chartConfigItems.title;
    }

    //Chart functionality - Start
    getDataAndRenderChart(filterId: number, filterType:Object) {
        this.dataService.get_lineMultipleChart_Data(this.component_context, filterId, filterType).then(resultData => {
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
            global: {
                useUTC: true
            },
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: (this.chartConfigItems.isTitleVisible) ? this.chartConfigItems.title : null,
            },
            subtitle: {
                text: this.chartConfigItems.subTitle
            },
            xAxis: {  
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    day: '%e. %b %Y'
                },
                tickInterval: this.get_XAxis_TickerInterval(),
            },
            yAxis: {
                title: {
                    text: this.chartConfigItems.yAxisTitle
                },
                min: 0,
                tickInterval: this.chartConfigItems.yAxisTickInterval,
                lineWidth: 1
            },
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
                    color: cData.properties.color,
                    tooltip: {
                        valueSuffix: ' ' + cData.properties.displayUnit
                    },
                    marker: {
                        enabled: cData.properties.markerEnabled
                        //symbol: 'circle',
                        //radius: 7
                    },
                    data: cData.data.map(function (point: any) {
                        return [point.key, point.value]
                    })
                });
                //this._logger.log(tempOptions.series[index]);
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

    get_XAxis_TickerInterval() {
        if (this.component_context === "sps-overview-historicProduction") {
            if (this.chartConfigItems.customFilterEnabled) {
                if (this.chartFilterCurrentSelection == 'day') {
                    return 24 * 60 * 1000;
                }
                else if (this.chartFilterCurrentSelection == 'month') {
                    return 24 * 3600 * 7 * 1000;
                }
                else if (this.chartFilterCurrentSelection == 'year') {
                    return 24 * 3600 * 30 * 1000;
                }
                else {
                    return 24 * 3600 * 1000;
                }
            }
        }
        else {
            return this.chartConfigItems.xAxisTickInterval;
        }
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
        //this._logger.log(this.chartInstance);
        if (exportType) {
            if (this.chartContextData != null) {
                this.renderChart();
                var exportOptions = { type: exportType, filename: this.title };
                if (exportType == 'application/vnd.ms-excel') {
                    let tempChartInstance: any = this.chartInstance;
                    tempChartInstance.downloadXLS(exportOptions);
                }
                else if (exportType == 'viewDataTable') {
                let tempChartInstance: any = this.chartInstance;

                let htmlString = tempChartInstance.getDataRows();
                this.htmlTable = "";
                this.htmlTable = this.chartConfigItems.tableString[0];
                for (var i = 0; i < htmlString.length; i++) {
                    this.htmlTable = this.htmlTable + this.chartConfigItems.tableString[1];
                    for (var j = 0; j < htmlString[i].length; j++) {
                        this.htmlTable = this.htmlTable + this.chartConfigItems.tableString[2];
                        this.htmlTable = this.htmlTable + htmlString[i][j] + this.chartConfigItems.tableString[3];
                    }
                }
                if (this.displayClass == "excel") {
                    this.displayClass = "table";
                    this.tableHidden = false;
                }
                else {
                    this.displayClass = "excel";
                    this.tableHidden = true;


                }

                this.tableVisible = true;
                this.htmlTable = this.htmlTable + "</tr></table>";
                this._logger.log(htmlString);
            }     
                else {
                    this.chartInstance.exportChart(exportOptions);
                }
            }
        }
    }

    onClickFilters(filterType: Object): void {
        //this._logger.log(this.chartInstance);
        if (filterType) {
            this.chartFilterCurrentSelection = filterType;
            this.getDataAndRenderChart(this.ObjFilter.id, this.chartFilterCurrentSelection);
        }
    }

    //Chart functionality - End


    onExpandCollapse() {
        this.notify.emit(this.currentControlId);
    }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/