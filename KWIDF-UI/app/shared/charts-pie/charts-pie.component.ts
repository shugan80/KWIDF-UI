import { Component, Input, OnChanges, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Filter } from '../model/filter';
import { TreeViewFilter } from '../model/filter';


import { CHART_DIRECTIVES } from 'angular2-highcharts';



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

    }

    ngOnInit() {
        console.log(' ChartComponent_Pie ngOnInit');
        this.loadConfigItems();
    }

    ngAfterViewInit() {
        
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
        if (this.component_context === "sps-overview-wellStatus") {
            this.chartConfigItems = configItems.overview_WellStatus_Config;
        }
        else {
            this.chartConfigItems = configItems.lossGain_Production_Config;
        }
        this.title = this.chartConfigItems.title;
    }

    //loadModuleComponents() {
    //    this.title = this.chartConfigItems.title;
    //    this.renderChart(this.ObjFilter.id);
    //}


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
                    en: true,
                    filename: "chart",
                    type: "image/png",
                    
                },
                series: [{
                    name: this.chartConfigItems.seriesName,
                    colorByPoint: true,
                    data: data.map(function (point:any) {
                        return [point.key, point.value]
                    })
                }]
            }

        });
    }

    options: Object;

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

    //Chart functionality - End


    onClickIcons(): void {

    }
}
