import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Logger } from "angular2-logger/core";

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
        private _logger: Logger, private router: Router,
        private filterDataService: FilterDataService) {

        // filterDataService.itemAdded$.subscribe(item => this.onItemAdded(item));
    }

    ngOnInit() {
        this._logger.log(' SPSLossGainComponent ngOnInit');
        this.subscription = this.filterDataService.navItem$.subscribe(
            item => {
                this.item = item;
                this.ObjFilter = this.filterDataService.getCurrentFilters();
                //this._logger.log(this.ObjFilter.id);
            });
    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }
}