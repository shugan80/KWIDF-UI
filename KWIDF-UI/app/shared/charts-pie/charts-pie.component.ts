import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { HttpModule } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Filter } from '../model/filter';
import { TreeViewFilter } from '../model/filter';


import { CHART_DIRECTIVES } from 'angular2-highcharts';

import { ConfigDataService } from '../services/configdata.service'
import { KeyValueData } from '../model/key-value';
import { StaticDataService } from '../services/staticdata.service';
import { FilterDataService } from '../services/filterdata.service';

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
    providers: [StaticDataService, ConfigDataService]
})
export class ChartComponent_Pie {
    @Input() currentFilters: Filter;
    @Input() component_context: string;
  
    ObjFilter: Filter;
    
    title='';
    public chartConfigItems: any;

    constructor(private _configService: ConfigDataService, private _filterService: FilterDataService, private dataService: StaticDataService) {
     
    }

    ngOnInit() {
        this._configService.configJsonPath = '/app/sps/config/sps.config.json';
        this.getConfigItems();
   
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

    loadModuleComponents() {
        this.title = this.chartConfigItems.title;
        this.renderChart(this.ObjFilter.id);
    }

    //Chart functionality - Start
    renderChart(filterId: number) {
        console.log("sudhakar..." + filterId);
        this.dataService.get_pieChart_Data(this.component_context, filterId).then(data => {

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
                    enabled: true,
                    filename: "chart",
                    type: "image/png"
                },
                series: [{
                    name: this.chartConfigItems.seriesName,
                    colorByPoint: true,
                    data: data.map(function (point) {
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

    getConfigItems() {
        this._configService.getConfigItems().subscribe(
            items => {
                if (this.component_context === "sps-overview-wellStatus") {
                    this.chartConfigItems = items[0].overview_WellStatus_Config;
                }
                else {
                    this.chartConfigItems = items[0].lossGain_Production_Config;
                }
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