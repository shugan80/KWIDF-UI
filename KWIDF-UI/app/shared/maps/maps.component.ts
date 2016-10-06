import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { HttpModule } from '@angular/http';

import { TreeViewFilter } from '../model/filter';

@Component({
    moduleId: module.id,
    selector: 'map-area',
    templateUrl: './maps.component.html'
})

export class MapsComponent {
    @Input() currentFilters: TreeViewFilter;
    
    
    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        let log: string[] = [];
        for (let propName in changes) {
            let changedProp = changes[propName];
            let from = JSON.stringify(changedProp.previousValue);
            let to = JSON.stringify(changedProp.currentValue);
            log.push(`${propName} changed from ${from} to ${to}`);
        }
      
    }
   
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/