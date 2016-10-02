import { Injectable, Output, EventEmitter}  from '@angular/core';

import { Filter } from '../model/filter';
import { Filters } from '../data/mock-filters';

export class GlobalFilter {
    constructor(public id: number, public name: string) { }
}


let filterObj = new GlobalFilter(1, "Tets");

@Injectable()
export class FilterDataService {
    //public itemAdded$: EventEmitter<Filter> = new EventEmitter<Filter>(false);

    
    @Output() modelChange$: EventEmitter<Filter> = new EventEmitter<Filter>();

    constructor() {
       // this.itemAdded$ = new EventEmitter();
        //this.modelChange$ = new EventEmitter();
    }

    public setModel(model: Filter): void {
        console.log(model);
        this.modelChange$.emit(model);
    }

    getFilters(): Promise<Filter[]> {
        return Promise.resolve(Filters);
    }
    // See the "Take it slow" appendix
    getFiltersSlowly(): Promise<Filter[]> {
        return new Promise<Filter[]>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() => this.getFilters());
    }

    getFilter() {
        return filterObj;
           
    }

    addFilter(filter: Filter) {
        filterObj = filter;
      //  this.itemAdded$.emit(filter);

        //name = name.trim();
        //if (name) {
        //    let crisis = new Crisis(CrisisService.nextCrisisId++, name);
        //    crisesPromise.then(crises => crises.push(crisis));
        //}
    }

}