import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Logger } from "angular2-logger/core";

import { TabMenuComponent } from '../../shared/tab-menu/tab-menu.component';
import { Filter } from '../../shared/model/filter';
import { TreeViewFilter } from '../../shared/model/filter';
import { FilterDataService } from '../../shared/services/filterdata.service';


@Component({
    selector: 'sps-overview',
    templateUrl: 'app/sps/sps-overview/sps-overview.component.html'
})
export class SPSOverviewComponent {
    item: number;
    //title = 'North Kuwait';
    filters: Filter[];
    ObjFilter: TreeViewFilter;
    subscription: Subscription;


    constructor(
        private _logger: Logger, private router: Router,
        private filterDataService: FilterDataService) {

    }

    ngOnInit() {
        this._logger.log(' SPSOverviewComponent ngOnInit');
        this.subscription = this.filterDataService.navItem$.subscribe(
            item => {
                this.item = item;
                this.ObjFilter = this.filterDataService.getCurrentFilters();
            });
    }


    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }




}