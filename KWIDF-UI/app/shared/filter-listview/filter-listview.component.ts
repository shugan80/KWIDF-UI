import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { TreeViewFilter,ListViewFilter } from '../model/filter';

import { ListViewDataService } from '../services/listviewdata.service';
import { FilterDataService } from '../../shared/services/filterdata.service';

@Component({

    selector: 'filter-list-view',
    templateUrl: 'app/shared/filter-listview/filter-listview.component.html',
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterListViewComponent {
    item: number = 0;
    filters: ListViewFilter[];
    subscription: Subscription;
    ObjFilter: TreeViewFilter;
    page: number = 1;

    constructor(private filterListviewDataService: ListViewDataService,private filterDataService: FilterDataService) { }

    getListviewFilters(cFilters: Array<number>) {
        this.filters = this.filterListviewDataService.getListviewFilters(cFilters);
    }

    ngOnInit(): void {      
        this.subscription = this.filterDataService.navItem$.subscribe(
            item => {
                this.item = item;
                this.ObjFilter = this.filterDataService.getCurrentFilters();
                let cFilters: Array<number> = [];
                cFilters = this.ObjFilter.children.map(function (d: any) {
                    return d.id;
                });
                cFilters.push(this.ObjFilter.id);
                this.getListviewFilters(cFilters);
                this.page = 1;
            });
    }
    
}