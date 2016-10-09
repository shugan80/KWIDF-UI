﻿import { Component, Input, OnChanges, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Filter } from '../model/filter';
import { TreeViewFilter } from '../model/filter';


import { ChartComponent, Highcharts } from 'angular2-highcharts';
require('highcharts/modules/exporting.js')(Highcharts);
require('highcharts/modules/export-csv.js')(Highcharts);


import { ConfigDataService } from '../services/configdata.service';
import { GlobalDataService } from '../services/globaldata.service';
import { KeyValueData } from '../model/key-value';
import { StaticDataService } from '../services/staticdata.service';
import { FilterDataService } from '../services/filterdata.service';

//declare var jQuery: any;



@Component({
    moduleId: module.id,
    selector: 'chart-pie-area',
    templateUrl: './charts-pie.component.html',
    styles: [`
      chart {
        display: block;
        height:230px;
      }
    `],
    providers: [StaticDataService, ConfigDataService, GlobalDataService]
})
export class ChartComponent_Pie {
    @Input() currentFilters: TreeViewFilter;
    @Input() component_context: string;


    ObjFilter: Filter;
    title = '';
    public chartConfigItems: any;

    constructor(private _globalDataService: GlobalDataService, private _configService: ConfigDataService, private _filterService: FilterDataService, private dataService: StaticDataService) {
        this.loadConfigItems();
    }

    ngOnInit() {
        console.log(' ChartComponent_Pie ngOnInit');
        this.loadConfigItems();
    }

    ngAfterViewInit() {
        this.renderChart(this.ObjFilter.id);
    }


    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        let isFirstTime = !(this.ObjFilter);
        let log: string[] = [];
        for (let propName in changes) {
            if (propName == "currentFilters") {
                let changedProp = changes[propName];
                this.ObjFilter = changedProp.currentValue;
                if (!isFirstTime) {
                    this.renderChart(this.ObjFilter.id);
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
        if (this.component_context === "sps-overview-wellStatus") {
            this.chartConfigItems = configItems.overview_WellStatus_Config;
        }
        else {
            this.chartConfigItems = configItems.lossGain_Production_Config;
        }
        this.title = this.chartConfigItems.title;
    }

    //Chart functionality - Start
    renderChart(filterId: number) {
        this.dataService.get_pieChart_Data(this.component_context, filterId).then(resultData => {
            let data: Array<KeyValueData>;
            if (resultData.length > 0) {
                data = resultData[0].data;
            }
            else {
                data = [];
            }

            let maxYAxisData = this.getMaxData(data);
            let dataColors = this.getColors(data);

            this.options = {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: (this.chartConfigItems.isTitleVisible) ? this.chartConfigItems.title : null,
                },
                subtitle: {
                    text: this.chartConfigItems.subTitle
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: this.chartConfigItems.isDataLabelsEnabled,
                            distance: -30,
                            color: this.chartConfigItems.dataLablesColor,
                            formatter: function () {
                                return Math.round(this.y);
                            },
                        },
                        showInLegend: this.chartConfigItems.isLegendEnabled
                    }
                },
                colors: dataColors,
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
                    name: this.chartConfigItems.seriesName,
                    colorByPoint: true,
                    data: data.map(function (point: any) {
                        return [point.key, point.value]
                    })
                }]
            }

        });
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


    getColors(dataArray: any) {
        if (dataArray != null && dataArray.length > 0) {
            let colors: any = [];
            colors = dataArray.map(function (d: any) {
                return d.properties.color;
            })
            return colors;
        }
        else {
            return null;
        }
    }

    onClickIcons(exportType: string): void {
        //console.log(this.chartInstance);
        if (exportType) {
            this.renderChart(this.ObjFilter.id);
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
