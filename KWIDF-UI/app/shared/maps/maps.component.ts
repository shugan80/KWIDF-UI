﻿import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { HttpModule } from '@angular/http';

import { TreeViewFilter } from '../model/filter';
import { Highcharts} from 'angular2-highcharts';
//import {Highchmap}       from 'highcharts/modules/map';
require('highcharts/modules/map.js')(Highcharts);
require('highcharts/modules/exporting.js')(Highcharts);



@Component({
    moduleId: module.id,
    selector: 'map-area',
   
   templateUrl: './maps.component.html',
    styles: [`

      chart {
        display: block;
height: 500px; width: 365px; max-width: 600px; margin: 0 auto;
      }
    `],
//    template: `<chart type="Map" [options]="options" (load) = "saveInstance($event.context)" class="highcart-pie"></chart>`
})

//export class MapsComponent {
//    @Input() currentFilters: TreeViewFilter;
    
    
//    //ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
//    //    let log: string[] = [];
//    //    for (let propName in changes) {
//    //        let changedProp = changes[propName];
//    //        let from = JSON.stringify(changedProp.previousValue);
//    //        let to = JSON.stringify(changedProp.currentValue);
//    //        log.push(`${propName} changed from ${from} to ${to}`);
//    //    }
      
//    //}
   
//}


export class MapsComponent {
    constructor() {
        this.options = {
         
            legend: {
                align: 'left',
                backgroundColor: 'white',
                floating: true,
                layout: 'vertical',
                verticalAlign: 'top',
                x: 25,
                y: -25
            },


            title: {
                text: 'Well Map'

            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                   
                    verticalAlign: 'bottom',
                    align: 'right'
                }
            },

            tooltip: {
                headerFormat: '',
                pointFormat: '<b>WELL NAME     SA-0035</b><br>Status: producing /ESP<br> Liquid Rate(stb/d):1038<br>Status: producing /ESP<br>Water Cut(%):41<br>oil rate(stb/d):612<br>Uptime(hrs):23.4<br>Oil time Opportunity(stb/d):220,<br>Last Well Test(stb/d):10/11/2016(30days)'
            },

            exporting: {
                enabled: false,
             
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
              
                mapData: {
                    "title": "Kuwait", "version": "1.1.2", "type": "FeatureCollection", "copyright": "Copyright (c) 2015 Highsoft AS, Based on data from Natural Earth", "copyrightShort": "Natural Earth", "copyrightUrl": "http://www.naturalearthdata.com", "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG:32638" } }, "hc-transform": { "default": { "crs": "+proj=utm +zone=38 +datum=WGS84 +units=m +no_defs", "scale": 0.00374732643825, "jsonres": 15.5, "jsonmarginX": -999, "jsonmarginY": 9851.0, "xoffset": 649130.824313, "yoffset": 3332685.86838 } },
                    "features": [{ "type": "Feature", "id": "KW.JA", "properties": { "hc-group": "admin1", "hc-middle-x": 0.49, "hc-middle-y": 0.49, "hc-key": "kw-ja", "hc-a2": "JA", "labelrank": "8", "hasc": "KW.JA", "alt-name": "Jahra", "woe-id": "20070165", "subregion": null, "fips": "KU05", "postal-code": "JA", "name": "Al Jahrah", "country": "Kuwait", "type-en": "Province", "region": null, "longitude": "48.2027", "woe-name": "Al Jahrah", "latitude": "29.7843", "woe-label": "Al JahraÂ´, KW, Kuwait", "type": "Muhafazah" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[8210, 9186], [9120, 7968], [9211, 7738], [9181, 7449], [9080, 7250], [8914, 7025], [8712, 6831], [8505, 6722], [8261, 6741], [8121, 6903], [7911, 7366], [7666, 7781], [7600, 7856], [7486, 7919], [7441, 7986], [7812, 8244], [7839, 8468], [7749, 8501], [7647, 8503], [7700, 8600], [7780, 8595], [7919, 8510], [8060, 8510], [8103, 8554], [8068, 8654], [8250, 8755], [8269, 8813], [8177, 8873], [8113, 8880], [8040, 8844], [7960, 8910], [7941, 9091], [7842, 9087], [7808, 9114], [7830, 9162], [7979, 9253], [8059, 9260], [8136, 9238], [8210, 9186]]], [[[7328, 9082], [7245, 9097], [7203, 9181], [7279, 9236], [7390, 9393], [7451, 9430], [7669, 9466], [7756, 9460], [7741, 9393], [7590, 9302], [7479, 9166], [7328, 9082]]], [[[4184, 2598], [4112, 2715], [1532, 3006], [-999, 3280], [-1, 4425], [343, 5023], [698, 5425], [780, 5552], [940, 5992], [1349, 6694], [1455, 6937], [1486, 7197], [1514, 7290], [1712, 7677], [2168, 8901], [2355, 9178], [2644, 9382], [3539, 9773], [3861, 9819], [5308, 9851], [5630, 9796], [6858, 9218], [6901, 9111], [7020, 8890], [7049, 8755], [7053, 8516], [7075, 8364], [7153, 8153], [7308, 7848], [7487, 7616], [7635, 7626], [7739, 7341], [7877, 7057], [8124, 6722], [8241, 6471], [8221, 6340], [8096, 6318], [7863, 6412], [7743, 6481], [7704, 6539], [7353, 6593], [7026, 6530], [6863, 6382], [6724, 6235], [6383, 6035], [6151, 5808], [6031, 5608], [5916, 5450], [5662, 5323], [5641, 5221], [5590, 5125], [5715, 5117], [6079, 5193], [6334, 5296], [6413, 5251], [6255, 5139], [6257, 5062], [6224, 4972], [6364, 4881], [6463, 4885], [6470, 4864], [6501, 4801], [6395, 4782], [6377, 4516], [6062, 4105], [6024, 3237], [6004, 3151], [5874, 3104], [4613, 2896], [4340, 2697], [4184, 2598]]]] } }, { "type": "Feature", "id": "KW.KU", "properties": { "hc-group": "admin1", "hc-middle-x": 0.92, "hc-middle-y": 0.25, "hc-key": "kw-ku", "hc-a2": "KU", "labelrank": "8", "hasc": "KW.KU", "alt-name": "Capital, Kuwait", "woe-id": "20070169", "subregion": null, "fips": "KU02", "postal-code": "KU", "name": "Al Asimah", "country": "Kuwait", "type-en": "Province", "region": null, "longitude": "48.3318", "woe-name": "Al Asimah", "latitude": "29.4497", "woe-label": "Al `Asimah, KW, Kuwait", "type": "Muhafazah" }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[9392, 5677], [9439, 5620], [9503, 5446], [9493, 5381], [9354, 5418], [9299, 5452], [9140, 5584], [9031, 5622], [8881, 5641], [8762, 5632], [8762, 5801], [8822, 5900], [8919, 5916], [9145, 5856], [9234, 5824], [9346, 5734], [9392, 5677]]], [[[6463, 4885], [6691, 4968], [6722, 5124], [6805, 5162], [6914, 5130], [7025, 5216], [7081, 5313], [7170, 5357], [7212, 5321], [7302, 5202], [7143, 5083], [7214, 4950], [6749, 4877], [6501, 4801], [6470, 4864], [6463, 4885]]]] } }, { "type": "Feature", "id": "KW.FA", "properties": { "hc-group": "admin1", "hc-middle-x": 0.48, "hc-middle-y": 0.49, "hc-key": "kw-fa", "hc-a2": "FA", "labelrank": "8", "hasc": "KW.FA", "alt-name": "Farwaniya", "woe-id": "20070168", "subregion": null, "fips": "KU06", "postal-code": "FA", "name": "Al Farwaniyah", "country": "Kuwait", "type-en": "Province", "region": null, "longitude": "47.9381", "woe-name": "Al Farwaniyah", "latitude": "29.2592", "woe-label": "Al Farwaniyah, KW, Kuwait", "type": "Muhafazah" }, "geometry": { "type": "Polygon", "coordinates": [[[6377, 4516], [6395, 4782], [6501, 4801], [6749, 4877], [7214, 4950], [7316, 4727], [7406, 4529], [7476, 4173], [6591, 3998], [6578, 4271], [6491, 4408], [6377, 4516]]] } }, { "type": "Feature", "id": "KW.AH", "properties": { "hc-group": "admin1", "hc-middle-x": 0.47, "hc-middle-y": 0.64, "hc-key": "kw-ah", "hc-a2": "AH", "labelrank": "7", "hasc": "KW.AH", "alt-name": null, "woe-id": "20070166", "subregion": null, "fips": "KU04", "postal-code": "AH", "name": "Al Ahmadi", "country": "Kuwait", "type-en": "Province", "region": null, "longitude": "47.9393", "woe-name": "Al Ahmadi", "latitude": "28.8653", "woe-label": "Al Ahmadi, KW, Kuwait", "type": "Muhafazah" }, "geometry": { "type": "Polygon", "coordinates": [[[7880, 4214], [7931, 4085], [8013, 3962], [8046, 3833], [8209, 2958], [8315, 2745], [8609, 2331], [8696, 2252], [8916, 2186], [8936, 2089], [8915, 1962], [8911, 1832], [8962, 1707], [9123, 1492], [9220, 1327], [9355, 1275], [9591, 1231], [9538, 1130], [9518, 1016], [9527, 899], [9564, 790], [9446, 874], [9447, 791], [9527, 741], [9460, 669], [9374, 697], [9372, 562], [9426, 531], [9502, 573], [9568, 654], [9586, 589], [9618, 279], [9689, 115], [9851, -70], [5504, -225], [5453, -55], [5344, 53], [5211, 142], [5088, 251], [4999, 395], [4917, 583], [4858, 778], [4829, 1125], [4799, 1287], [4467, 2139], [4184, 2598], [4340, 2697], [4613, 2896], [5874, 3104], [6004, 3151], [6024, 3237], [6062, 4105], [6377, 4516], [6491, 4408], [6578, 4271], [6591, 3998], [7476, 4173], [7831, 4206], [7880, 4214]]] } }, { "type": "Feature", "id": "KW.1922", "properties": { "hc-group": "admin1", "hc-middle-x": 0.54, "hc-middle-y": 0.54, "hc-key": "kw-1922", "hc-a2": "MA", "labelrank": "8", "hasc": "KW.", "alt-name": null, "woe-id": "55943079", "subregion": null, "fips": null, "postal-code": null, "name": "Mubarak Al-Kabeer", "country": "Kuwait", "type-en": "Province", "region": null, "longitude": "48.0548", "woe-name": "Mubarak Al-Kabeer", "latitude": "29.2535", "woe-label": "Mubarak Al Kabeer, KW, Kuwait", "type": "Muhafazah" }, "geometry": { "type": "Polygon", "coordinates": [[[7476, 4173], [7406, 4529], [7316, 4727], [7549, 4733], [7794, 4836], [7788, 4687], [7811, 4497], [7880, 4214], [7831, 4206], [7476, 4173]]] } }, { "type": "Feature", "id": "KW.HW", "properties": { "hc-group": "admin1", "hc-middle-x": 0.48, "hc-middle-y": 0.54, "hc-key": "kw-hw", "hc-a2": "HW", "labelrank": "9", "hasc": "KW.HW", "alt-name": "Hawali, Howali", "woe-id": "20070167", "subregion": null, "fips": "KU03", "postal-code": "HW", "name": "Hawalli", "country": "Kuwait", "type-en": "Province", "region": null, "longitude": "48.0306", "woe-name": "Hawalli", "latitude": "29.3243", "woe-label": "Hawalli, KW, Kuwait", "type": "Muhafazah" }, "geometry": { "type": "Polygon", "coordinates": [[[7316, 4727], [7214, 4950], [7143, 5083], [7302, 5202], [7399, 5113], [7616, 5044], [7823, 5092], [7794, 4836], [7549, 4733], [7316, 4727]]] } }]
                },

                name: 'Basemap',
                borderColor: '#A0A0A0',
                nullColor: 'rgba(200, 200, 200, 0.3)',
                showInLegend: false
            }, {
                    // Specify points using lat/lon
                    type: 'mappoint',
                    name: 'Shut-in',
                    color: '#ff0000',
                    dataLabels: {
                        enabled: true,
                        x: 0,
                        y: 15,
                        formatter: function () {
                            return this.point.name.substring(0, 3);
                        },
                        style: { color: "white" }
                    },
                    marker: {
                        radius: 13
                    },
                    data: [
                        {
                        name:'ESP',
                           // name: 'jahar',
                            lat: 29.336573,
                            lon: 47.675529
                        },
                        {
                            name: 'ESP',
                            //name: 'Kuwait',
                            lat: 29.378586,
                            lon: 47.990341
                        }

                    ]
                }, {
                    // Specify points using lat/lon
                    type: 'mappoint',
                    name: 'Producing',
                    color: '#00ff00',
                    dataLabels: {
                        enabled: true,
                        x: 0,
                        y: 15,
                        formatter: function () {
                            return this.point.name.substring(0, 2);
                        },
                        style: { color: "white" }
                    },
                    marker: {
                        radius: 13,
                        symbol: 'circle'
                    },
                    data: [{
                        name: 'ESP',
                       // name: 'GL',
                        lat: 29.092777,
                        lon: 48.081322
                    },

                        {
                            name: 'GL',
                         //   name: 'Jeleeb',
                            lat: 29.266666,
                            lon: 47.933334
                        }                    ]
                }]


        }

    }
    options: Object;
    chartInstance: HighchartsChartObject;

    saveInstance(chartInstance: HighchartsChartObject) {
        this.chartInstance = chartInstance;
    }

    onClickIcons(exportType: string): void {
        debugger;
        var exportOptions = { type: exportType, filename: 'well map' };
        this.chartInstance.exportChart(exportOptions);
    }
}






/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/