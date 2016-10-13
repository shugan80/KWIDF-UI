import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Logger } from "angular2-logger/core";
import { ChartComponent, Highcharts } from 'angular2-highcharts';
require('highcharts/modules/exporting.js')(Highcharts);
require('highcharts/modules/export-csv.js')(Highcharts);
require('highcharts/highcharts-more.js')(Highcharts);
require('highcharts/modules/solid-gauge.js')(Highcharts);



import { Filter } from '../model/filter';
import { TreeViewFilter } from '../model/filter';
import { GlobalDataService } from '../services/globaldata.service';
import { KeyValueData } from '../model/key-value';
import { KeyValueObject } from '../model/key-value';
import { StaticDataService } from '../services/staticdata.service';
import { FilterDataService } from '../services/filterdata.service';

//declare var jQuery: any;



@Component({
    moduleId: module.id,
    selector: 'chart-gauge-area',
    templateUrl: './charts-gauge.component.html',
    styles: [`
      chart {
        display: block;
      }
    `],
    providers: [StaticDataService, GlobalDataService]
})
export class ChartComponent_Gauge {
    @Input() currentFilters: TreeViewFilter;
    @Input() component_context: string;
    @Input() currentControlId: string;

    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    tableVisible: any = false;
    htmlTable: any;
    htmlContent: any;

    ObjFilter: Filter;
    title = '';
    //chartid: string = '';
    //expandStatus: string = 'collapse';
    public chartConfigItems: any;
    chartContextData: KeyValueObject;

    constructor(private _logger: Logger, private _globalDataService: GlobalDataService,
        private _filterService: FilterDataService,
        private dataService: StaticDataService) {
    }

    ngOnInit() {
        this._logger.log(' ChartComponent_Gauge ngOnInit');
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
        if (this.component_context === "sps-overview-latestProduction") {
            this.chartConfigItems = configItems.overview_WellStatus_Config;
        }
        else {
            this.chartConfigItems = configItems.lossGain_Production_Config;
        }
        this.title = this.chartConfigItems.title;
    }

    //Chart functionality - Start

    getDataAndRenderChart(filterId: number) {
        //this.dataService.get_pieChart_Data(this.component_context, filterId).then(resultData => {
        //this.chartContextData = {};
        this.chartOptions_Green = this.renderChart(this.chartOptions_Green, { maxValue: 1600, currentvalue: 1190 }, "#00b050", "Oil Rate(stb/d)");
        this.chartOptions_Blue = this.renderChart(this.chartOptions_Blue, { maxValue: 1090, currentvalue: 667 }, "#5b9bd5", "Water Rate(stb/d)");
        this.chartOptions_Red = this.renderChart(this.chartOptions_Red, { maxValue: 1000, currentvalue: 610 }, "#ff0000", "GOR (scf/stb)");
        this.chartOptions_Yellow = this.renderChart(this.chartOptions_Yellow, { maxValue: 100, currentvalue: 39 }, "#ff9900", "Water Cut (%)");
        //});
    }

    renderChart(chartOptions: Object, dummydata: any, color: string, seriesName: string) {
        //let data: Array<KeyValueData>;
        //if (this.chartContextData != null) {
        //    data = this.chartContextData.data;
        //}
        //else {
        //    data = [];
        //}

        let options: Object = {
            chart: {
                type: 'solidgauge'
            },
            title: null,
            pane: {
                center: ['50%', '20%'],
                size: '70%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: '#d9d9d9',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            tooltip: {
                enabled: false
            },
            // the value axis
            yAxis: {
                stops: [
                    [0.1, color]
                ],
                //lineWidth: 0,
                //minorTickInterval: null,
                //tickAmount: 2,
                //labels: {
                //    y: 16
                //},
                min: 0,
                max: dummydata.maxValue,
                title: {
                    text: seriesName,
					y:-30
                },
				 labels: {
					y: 20
				}
            },
            plotOptions: {
                solidgauge: {
                    //dataLabels: {
                    //    y: 5,
                    //    borderWidth: 0,
                    //    useHTML: true
                    //}
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
                name: seriesName,
                data: [dummydata.currentvalue],
                tooltip: {
                    valueSuffix: ' stb/d'
                }
            }]
        }

        chartOptions = options;

        return chartOptions;
    }

    chartOptions_Green: Object;
    chartOptions_Blue: Object;
    chartOptions_Red: Object;
    chartOptions_Yellow: Object;

    chartInstance_Green: HighchartsChartObject;
    chartInstance_Blue: HighchartsChartObject;
    chartInstance_Red: HighchartsChartObject;
    chartInstance_Yellow: HighchartsChartObject;

    saveInstance(chartInstance: HighchartsChartObject, type: string) {
        if (type == "chartComp_Green") {
            this.chartInstance_Green = chartInstance;
        }
        else if (type == "chartComp_Blue") {
            this.chartInstance_Blue = chartInstance;
        }
        else if (type == "chartComp_Red") {
            this.chartInstance_Red = chartInstance;
        }
        else if (type == "chartComp_Yellow") {
            this.chartInstance_Yellow = chartInstance;
        }
    }


    onClickIcons(exportType: string): void {
        //this._logger.log(this.chartInstance);
        //if (exportType) {
        //    if (this.chartContextData != null) {
        //        this.renderChart();
        //        var exportOptions = { type: exportType, filename: this.title };
        //        if (exportType == 'application/vnd.ms-excel') {
        //            let tempChartInstance: any = this.chartInstance;
        //            tempChartInstance.downloadXLS(exportOptions);
        //        }
        //        else if (exportType == 'viewDataTable') {
        //            let tempChartInstance: any = this.chartInstance;
        //            //let htmlString = tempChartInstance.getTable();
        //            //let htmlString = tempChartInstance.getCSV();
        //            let htmlString = tempChartInstance.getDataRows();
        //            this.htmlTable = "";
        //            this.htmlTable = "<table class='table'><tr><input type='button' (click)='close()' value='close' />";
        //            for (var i = 0; i < htmlString.length; i++) {
        //                this.htmlTable = this.htmlTable + "</tr><tr>"
        //                for (var j = 0; j < htmlString[i].length; j++) {
        //                    this.htmlTable = this.htmlTable + "<td>";
        //                    this.htmlTable = this.htmlTable + htmlString[i][j] + "</td>";
        //                }
        //            }
        //            this.tableVisible = true;
        //            this.htmlTable = this.htmlTable + "</tr></table>";
        //            this._logger.log(htmlString);
        //        }
        //        else {
        //            this.chartInstance.exportChart(exportOptions);
        //        }
        //    }
        //}
    }

    //Chart functionality - End


    onExpandCollapse() {
        //alert(this.currentId);
        //alert(this.currentTabId);
        //this.chartid = 'ov-production';
        //if (this.expandStatus == 'collapse')
        //    this.expandStatus = 'expand';
        //else
        //    this.expandStatus == 'collapse';

        this.notify.emit(this.currentControlId);
    }



}
