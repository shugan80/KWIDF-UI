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

    ids: string[];
    sps_overview_wellMap_ID: string = 'sps-ov-well-map';
    sps_overview_latProd_ID: string = 'sps-ov-lat-prod';
    sps_overview_histProd_ID: string = 'sps-ov-hist-prod';
    sps_overview_wellStatus_ID: string = 'sps-ov-well-status';
    sps_overview_wellEvents_ID: string = 'sps-ov-well-events';
    sps_overview_downTime_ProdLoss_ID: string = 'sps-ov-downtime-prodLoss';

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

        this.maximizeClass = "col-md-12";
        this.expendClass = "col-md-4";
    }


    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    onNotify(controlId: string): void {

        let controlIds = ['sps-ov-well-map', 'sps-ov-lat-prod',
            'sps-ov-hist-prod', 'sps-ov-well-status',
            'sps-ov-well-events', 'sps-ov-downtime-prodLoss'];


        if (this.isExpendClass === false) {
            this.isExpend = true;
            this.tempOldClass = this.expendClass;
            $("#" + controlId).removeClass(this.expendClass).addClass(this.maximizeClass);
            this.isExpendClass = true;

            var parent_id = $("#" + controlId).parents('.col-md-4');
            if (parent_id.length > 0) {
                this.tempParentOldClass = "col-md-4";
                $(parent_id).removeClass("col-md-4").addClass("col-md-12");
            } else {
                parent_id = $("#" + controlId).parents('.col-md-8');
                this.tempParentOldClass = "col-md-8";
                $(parent_id).removeClass("col-md-8").addClass("col-md-12");
            }

        } else {
            this.isExpend = false;
            $("#" + controlId).removeClass(this.maximizeClass);
            this.isExpendClass = false;

            var parent_id = $("#" + controlId).parents('.col-md-12');
            if (parent_id.length > 0) {
                $(parent_id).removeClass("col-md-12").addClass(this.tempParentOldClass);
            } 
        };

        for (let value of controlIds) {
            if (this.isExpendClass === true) {
                if (value !== controlId) {
                    $("#" + value).hide();
                };
            } else {
                $("#" + value).show();
            }
        }

       

        //alert($(window).height());

        //alert($('#fixed-ht').height($(window).height() - 200));


    }
    onNotifyPopup(htmlTable: string): void {
        this.popupStr = htmlTable;
        this.refObj.open();
        //this.modal.alert()
        //    .size('lg')
        //    .showClose(true)
        //    .title('A simple Alert style modal window')
        //    .body(`
        //    <h4>Alert is a classic (title/body/footer) 1 button modal window that 
        //    does not block.</h4>
        //    <b>Configuration:</b>
        //    <div>`+ htmlTable + `</div>`)
        //    .open();
    }
}