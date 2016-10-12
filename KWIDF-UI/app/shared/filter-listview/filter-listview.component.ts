import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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

    getListviewFilters(id:any,level:any) {
        this.filters= this.filterListviewDataService.getListviewFilters(id,level);
    }

    ngOnInit(): void {
       
        
        //this.filterListviewDataService.changeListviewItem(this.item);

        this.subscription = this.filterDataService.navItem$.subscribe(
            item => {
                this.item = item;
                this.ObjFilter = this.filterDataService.getCurrentFilters();
                //this.getListviewFilters(this.ObjFilter.id, this.ObjFilter.level);
                this.filters = this.filterListviewDataService.getListviewFilters(this.ObjFilter.id, this.ObjFilter.level);
                this.page = 1;
            });

    }
}