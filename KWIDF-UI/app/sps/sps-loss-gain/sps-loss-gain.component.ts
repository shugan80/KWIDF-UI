import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router }  from '@angular/router';
import {Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { TabMenuComponent } from '../../shared/tab-menu/tab-menu.component';

import { Filter } from '../../shared/model/filter';
import { TreeViewFilter } from '../../shared/model/filter';
import { FilterDataService } from '../../shared/services/filterdata.service';

@Component({
    moduleId: module.id,
    selector: 'sps-loss-gain',
    templateUrl: './sps-loss-gain.component.html'

})
export class SPSLossGainComponent {


    item: number;
    currentFilters: TreeViewFilter[];
    ObjFilter: Filter;
    subscription: Subscription;
    
    constructor(
        private router: Router, private filterDataService: FilterDataService) {

        // filterDataService.itemAdded$.subscribe(item => this.onItemAdded(item));
    }

    ngOnInit() {
        console.log(' SPSLossGainComponent ngOnInit');
        this.subscription = this.filterDataService.navItem$.subscribe(
            item => {
                this.item = item;
                this.ObjFilter = this.filterDataService.getCurrentFilters();
                //console.log(this.ObjFilter.id);
            });
    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }
}