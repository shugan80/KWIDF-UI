import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router }  from '@angular/router';
import {Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { TabMenuComponent } from '../../shared/tab-menu/tab-menu.component';

import { Filter } from '../../shared/model/filter';
import { FilterDataService } from '../../shared/services/filterdata.service';

@Component({
    moduleId: module.id,
    selector: 'sps-welltest',
    templateUrl: './sps-welltest-priority.component.html'

})
export class SPSWellTestComponent {



    item: number;
    title = 'North Kuwait';
    filters: Filter[];
    ObjFilter: Filter;
    subscription: Subscription;

    constructor(
        private router: Router, private filterDataService: FilterDataService) {

     }

    ngOnInit() {
        this.subscription = this.filterDataService.navItem$.subscribe(
            item => {
               
                this.item = item;
                this.ObjFilter = this.filterDataService.getFilter();
              
            });
    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }
}