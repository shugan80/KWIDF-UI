import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';

import { Filter } from '../model/filter';
import { FilterDataService } from '../services/filterdata.service';

@Component({
    moduleId: module.id,
    selector: 'module-filter',
    templateUrl: './filter-treeview.component.html',
    styles: [`
        .selected {
          background-color: #CFD8DC !important;
          color: white;
        }
        .filters {
          margin: 0 0 2em 0;
          list-style-type: none;
          padding: 0;
          width: 15em;
        }
        .filters li {
          cursor: pointer;
          position: relative;
          left: 0;
          background-color: #EEE;
          margin: .5em;
          padding: .3em 0;
          height: 1.6em;
          border-radius: 4px;
        }
        .filters li.selected:hover {
          background-color: #BBD8DC !important;
          color: white;
        }
        .filters li:hover {
          color: #607D8B;
          background-color: #DDD;
          left: .1em;
        }
        .filters .text {
          position: relative;
          top: -3px;
        }
        .filters .badge {
          display: inline-block;
          font-size: small;
          color: white;
          padding: 0.8em 0.7em 0 0.7em;
          background-color: #607D8B;
          line-height: 1em;
          position: relative;
          left: -1px;
          top: -4px;
          height: 1.8em;
          margin-right: .8em;
          border-radius: 4px 0 0 4px;
        }
      `],
    providers: [FilterDataService]
})
export class FilterTreeViewComponent {
    title = 'North Kuwait';
    filters: Filter[];
    selectedFilter: Filter;

    constructor(private filterDataService: FilterDataService) { }

    getFilters(): void {
        this.filterDataService.getFilters().then(filters => this.filters = filters);
    }

    ngOnInit(): void {
        console.log('filter-onit');
        this.getFilters();
    }

    onSelect(filter: Filter): void {
        this.selectedFilter = filter;
        console.log('onSelect');
    }

}



