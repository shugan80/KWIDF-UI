import { Component, Input } from '@angular/core';
import { Router }  from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { TabMenuComponent } from '../../shared/tab-menu/tab-menu.component';

import { Filter } from '../../shared/model/filter';
import { FilterDataService } from '../../shared/services/filterdata.service';


@Component({
    selector: 'sps-overview',
    templateUrl: 'app/sps/sps-overview/sps-overview.component.html'
})
export class SPSOverviewComponent {
    item: number;
    //title = 'North Kuwait';
    filters: Filter[];
    ObjFilter: Filter;
    subscription: Subscription;

    childPath: string = '/app/sps/config/sps.config.json';

    constructor(
        private router: Router, private filterDataService: FilterDataService) {

    }

    ngOnInit() {
        this.subscription = this.filterDataService.navItem$.subscribe(
            item => {
                console.log("dsafsf");
                this.item = item;
                this.ObjFilter = this.filterDataService.getFilter();
              
            });
    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }




}