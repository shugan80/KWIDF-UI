﻿import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Filter } from '../model/filter';
import { TreeViewFilter } from '../model/filter';
import { FilterDataService } from '../services/filterdata.service';

@Component({
    moduleId: module.id,
    selector: 'map-area',
    templateUrl: './maps.component.html'
})

export class MapsComponent {
    @Input() currentFilters: Filter;

    constructor(private _filterService: FilterDataService) {
        this._filterService.navItem$.subscribe(
            (items: any) => {
                //console.log(items.name);
                //console.log(items.id);
                console.log(' MapsComponent subscribe - done');
            },
            (err: any) => {
                console.error(err);
            },
            () => {
                console.log(' MapsComponent subscribe - done');
            }
            
        );
    }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/