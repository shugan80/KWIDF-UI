import { Component, Input, SimpleChange } from '@angular/core';
import { HttpModule } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Filter } from '../model/filter';
import { TreeViewFilter } from '../model/filter';

//Import - Angular2 Log Services
//import { Logger } from "angular2-logger/core";
//import * as ng2log from 'angular2-logger/core';

import { CHART_DIRECTIVES } from 'angular2-highcharts';

import { ConfigDataService } from '../services/configdata.service'
import { KeyValueData } from '../model/key-value';
import { StaticDataService } from '../services/staticdata.service';
import { GlobalDataService } from '../services/globaldata.service';

@Component({
    moduleId: module.id,
    selector: 'chart-column-area',
    //templateUrl: './charts-column.component.html'
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

        //this.options = {
        //    title: { text: 'simple chart' },
        //    series: [{
        //        data: [29.9, 71.5, 106.4, 129.2],
        //    }]
        //};
    }

    ngOnInit() {
        this.chartConfigItems = this._globalDataService.getModuleConfigItems();
        this.loadConfigItems();
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        let log: string[] = [];
        for (let propName in changes) {
            if (propName == "currentFilters") {
                let changedProp = changes[propName];
                this.ObjFilter = changedProp.currentValue;
                this.renderChart(this.ObjFilter.id);
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
            let data: Array<KeyValueData>;
            if (resultData.length > 0) {
                data = resultData[0].data;
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

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/