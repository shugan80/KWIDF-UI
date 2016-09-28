import { Injectable } from '@angular/core';

import { Filter } from '../model/filter';
import { Filters } from '../data/mock-filters';

@Injectable()
export class FilterDataService {
    getFilters(): Promise<Filter[]> {
        return Promise.resolve(Filters);
    }
    // See the "Take it slow" appendix
    getFiltersSlowly(): Promise<Filter[]> {
        return new Promise<Filter[]>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() => this.getFilters());
    }
}