import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Logger } from "angular2-logger/core";

import { TabMenuComponent } from '../../shared/tab-menu/tab-menu.component';
import { Filter } from '../../shared/model/filter';
import { TreeViewFilter } from '../../shared/model/filter';
import { FilterDataService } from '../../shared/services/filterdata.service';
import { Modal } from 'ng2-modal';

declare var $: any;

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

    defaultChartColumnAreaHeight: number;
    defaultChartLineMultipleHeight: number;

    sps_overview_wellMap_ID: string = 'sps_overview_wellMap_ID';
    sps_overview_latProd_ID: string = 'sps_overview_latProd_ID';
    sps_overview_histProd_ID: string = 'sps_overview_histProd_ID';
    sps_overview_wellStatus_ID: string = 'sps_overview_wellStatus_ID';
    sps_overview_wellEvents_ID: string = 'sps_overview_wellEvents_ID';
    sps_overview_downTime_ProdLoss_ID: string = 'sps_overview_downTime_ProdLoss_ID';


    isExpendClass: boolean = false;
    isExpend: boolean = false;
    tempOldClass: string = '';
    tempParentOldClass: string = '';
    maximizeClass: string;
    expendClass: string;

    @ViewChild('firstModal') refObj: Modal;

    popupStr: string;
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

        this.defaultChartColumnAreaHeight = 162;
        this.defaultChartLineMultipleHeight = 280;
    }


    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

   
    onNotifyPopup(htmlTable: string): void {
        this.popupStr = htmlTable;
        this.refObj.open();
       
    }
}