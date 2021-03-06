import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Logger } from "angular2-logger/core";

import { TabMenuComponent } from '../../shared/tab-menu/tab-menu.component';
import { Filter } from '../../shared/model/filter';
import { FilterDataService } from '../../shared/services/filterdata.service';

@Component({
    moduleId: module.id,
    selector: 'sps-alarmsevents',
    templateUrl: './sps-alarms-events.component.html'

})
export class SPSAlarmsEventsComponent {


    item: number;
    //title = 'North Kuwait';
    filters: Filter[];
    ObjFilter: Filter;
    subscription: Subscription;

    constructor(
        private _logger: Logger, private router: Router,
        private filterDataService: FilterDataService) {

    }

    ngOnInit() {
        this._logger.log(' SPSAlarmsEventsComponent ngOnInit');
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