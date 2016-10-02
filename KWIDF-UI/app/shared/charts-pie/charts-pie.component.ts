import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Filter } from '../model/filter';

@Component({
    moduleId: module.id,
    selector: 'chart-pie-area',
    templateUrl: './charts-pie.component.html'
})
export class ChartComponent_Pie {
    @Input() filter: Filter;
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/