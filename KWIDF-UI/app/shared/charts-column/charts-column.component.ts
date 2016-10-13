import { Component, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Logger } from "angular2-logger/core";
import { ChartComponent, Highcharts } from 'angular2-highcharts';
require('highcharts/modules/exporting.js')(Highcharts);
require('highcharts/modules/export-csv.js')(Highcharts);

import { Filter } from '../model/filter';
import { TreeViewFilter } from '../model/filter';
import { KeyValueData } from '../model/key-value';
import { KeyValueObject } from '../model/key-value';
import { StaticDataService } from '../services/staticdata.service';
import { GlobalDataService } from '../services/globaldata.service';



@Component({
    moduleId: module.id,
    selector: 'chart-column-area',
    styles: [`
      chart {
       
        
      }
    `],
    templateUrl: `./charts-column.component.html`,
    providers: [StaticDataService, GlobalDataService]
})
export class ChartComponent_Column {
    @Input() currentFilters: TreeViewFilter;
    @Input() component_context: string;
    @Input() currentControlId: string;

    ObjFilter: Filter;
    chartConfigItems: any;
    title = '';
    chartContextData: KeyValueObject;
    htmlTable: any;
    tableVisible: any = false;

    @Output() notify: EventEmitter<string> = new EventEmitter<string>();
    @Output() notifyPopup: EventEmitter<string> = new EventEmitter<string>();

    constructor(private _logger: Logger, private _globalDataService: GlobalDataService,
        private dataService: StaticDataService) {

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
        this._logger.log('renderChart renderChart renderChart');
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
                lineWidth: 1,
                tickInterval: this.chartConfigItems.yAxisTickInterval,
            },
            legend: {
                enabled: this.chartConfigItems.isLegendEnabled
            },
            tooltip: {

            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 1,
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
                    //let htmlString = tempChartInstance.getTable();
                    //let htmlString = tempChartInstance.getCSV();
                    let htmlString = tempChartInstance.getDataRows();
                    this.htmlTable = "";
                    this.htmlTable = "<table class='table'><tr><input type='button' (click)='close()' value='close' />";
                    for (var i = 0; i < htmlString.length; i++) {
                        this.htmlTable = this.htmlTable + "</tr><tr>"
                        for (var j = 0; j < htmlString[i].length; j++) {
                            this.htmlTable = this.htmlTable + "<td>";
                            this.htmlTable = this.htmlTable + htmlString[i][j] + "</td>";
                        }
                    }
                    this.tableVisible = true;
                    this.htmlTable = this.htmlTable + "</tr></table>";
                    this._logger.log(htmlString);
                    // this.firstModal.open();
                    this.notifyPopup.emit(this.htmlTable);
                    // this.firstModal.open();
                    //var el = this._element.nativeElement;
                    //console.log(el);
                }
                else {
                    this.chartInstance.exportChart(exportOptions);
                }
            }
        }
    }

    onExpandCollapse() {
        this.notify.emit(this.currentControlId);
    }

    //Chart functionality - End

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/