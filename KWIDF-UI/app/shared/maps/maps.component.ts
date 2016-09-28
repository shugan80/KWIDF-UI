import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Filter } from '../model/filter';

@Component({
    moduleId: module.id,
    selector: 'map-area',
    template: `
        <div *ngIf="filter">
          <h2>MAP => {{filter.name}} details!</h2>
          <div>
            <label>MAP-id: </label>{{filter.id}}
          </div>
          <div>
            <label>MAP-name: </label>
            <input [(ngModel)]="filter.name" placeholder="name"/>
          </div>
        </div>
      `
})
export class MapsComponent {
    @Input() filter: Filter;
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/