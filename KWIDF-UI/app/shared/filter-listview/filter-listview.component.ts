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
    localFilters: ListViewFilter[];
    constructor(private filterListviewDataService: ListViewDataService,private filterDataService: FilterDataService) { }

    getListviewFilters(cFilters: Array<number>) {
        this.filters = this.filterListviewDataService.getListviewFilters(cFilters);
        this.localFilters = this.filterListviewDataService.getListviewFilters(cFilters);
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
    OnSearch(newItem: string) {       
        if (newItem != "") {
            this.filters = this.localFilters.filter(
                x => x.wellName.toLowerCase().indexOf(newItem.toLowerCase())!=-1);
        }
        else {
            this.filters = this.localFilters;
        }
       
    }
    eventHandler(event: any) {
        if (event.target.value != "") {
            this.filters = this.localFilters.filter(
                x => x.wellName.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1);
        }
        else {
            this.filters = this.localFilters;
        }
    }
    
}