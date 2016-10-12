import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


import { ListViewFilter } from '../model/filter';
import { ListViewFilters } from '../data/mock-listview';

@Injectable()
export class ListViewDataService {

    private listviewFilterObj: ListViewFilter;
    finalListviewFilters: any;

    // Observable navItem source
    private _listviewItemSource = new BehaviorSubject<number>(0);

    // Observable navItem stream
    listviewItem$ = this._listviewItemSource.asObservable();

    // service command
    changeListviewItem(number: number) {
        this._listviewItemSource.next(number);
    }

    getListviewFilters(cFilters: Array<number>) {
        let listViewFilters:any = [];
        for (let cID of cFilters) {
            var abc = ListViewFilters.filter(x => x.fieldId == cID);
            listViewFilters = listViewFilters.concat(abc);
        }
        this.finalListviewFilters = listViewFilters; 
        return this.finalListviewFilters;
    }
    // See the "Take it slow" appendix
    //getListviewFiltersSlowly(): Promise<ListViewFilter[]> {
    //    return new Promise<ListViewFilter[]>(resolve =>
    //        setTimeout(resolve, 2000)) // delay 2 seconds
    //        .then(() => this.getListviewFilters());
    //}

    getCurrentListviewFilters() {
        return this.listviewFilterObj;
    }

    publishListviewFilterData(filter: ListViewFilter) {
        this.listviewFilterObj = filter;
    }
}
