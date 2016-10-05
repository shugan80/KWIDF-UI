import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Filter } from '../model/filter';
import { Filters } from '../data/mock-filters';

import { TreeViewFilter } from '../model/filter';
import { TreeViewFilters } from '../data/mock-treeviewfilter';

@Injectable()
export class FilterDataService {
  filterObj:Filter;
    // Observable navItem source

    private _navItemSource = new BehaviorSubject<number>(0);
    // Observable navItem stream
    navItem$ = this._navItemSource.asObservable();
    // service command
    changeNav(item:number) {       
        this._navItemSource.next(item);
    }    

    getFilters(): Promise<TreeViewFilter[]> {
        return Promise.resolve(TreeViewFilters);
    }
    // See the "Take it slow" appendix
    getFiltersSlowly(): Promise<TreeViewFilter[]> {
        return new Promise<TreeViewFilter[]>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() => this.getFilters());
    }

    getFilter() {
        return this.filterObj;
           
    }

    addFilter(filter: Filter) {
        this.filterObj = filter;
     }
    filterChanged(): Observable<boolean> {
        return Observable.of(true);
    }

}