import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router }  from '@angular/router';
import {Observable } from 'rxjs/Rx';

import { TabMenuComponent } from '../../shared/tab-menu/tab-menu.component';

import { Filter } from '../../shared/model/filter';
import { FilterDataService, GlobalFilter } from '../../shared/services/filterdata.service';


@Component({
    moduleId: module.id,
    selector: 'sps-overview',
    templateUrl: './sps-overview.component.html',
    providers: [FilterDataService]
})
export class SPSOverviewComponent {
    title = 'North Kuwait';
    filters: Filter[];
    public selectedFilter: Filter;

    childPath: string = '/app/sps/config/sps.config.json';

    constructor(
        private router: Router, private filterDataService: FilterDataService) {
    }

    getFilters(): void {
        this.filterDataService.getFilters().then(filters => this.filters = filters);
    }

    ngOnInit(): void {
        console.log('filter-onit');
        this.getFilters();
    }

    onSelect(filter: Filter): void {
        this.selectedFilter = filter;
        console.log('onSelect-1');
        this.filterDataService.setModel(filter);
        console.log('onSelect-2');
        this.filterDataService.addFilter(filter);
        console.log('onSelect-3');
    }
}