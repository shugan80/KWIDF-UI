import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';

import { TreeViewFilter } from '../model/filter';
import { FilterDataService } from '../services/filterdata.service';

@Component({
    moduleId: module.id,
    selector: 'tree-view',
    templateUrl: './filter-treeview.component.html',   
    providers: [FilterDataService]
})
export class FilterTreeViewComponent {
    //title = 'North Kuwait';
    //selectedFilter: Filter;

    filters: TreeViewFilter[];

    expanded = true;
    checked = false;

    toggle() {
        this.expanded = !this.expanded;
    }

    getIcon() {
        if (this.expanded) {
            return '-';
        }

        return '+';
    }

    check() {
       
        this.checked = !this.checked;
        this.checkRecursive(this.checked);
    }

    check1() {

    }

    checkRecursive(state: boolean) {
        this.filters.forEach(d => {
            d.checked = state;
            d.checkRecursive(state);
        });
    }

    ngOnInit(): void {
        console.log('filter-onit');
        this.getFilters();
    }

    constructor(private filterDataService: FilterDataService) { }

    getFilters(): void {
        this.filterDataService.getFilters().then(filters => this.filters = filters);
    }

    //onSelect(filter: Filter): void {
    //    this.selectedFilter = filter;
    //    console.log('onSelect');
    //}

}



