import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

//Import High charts
import { ChartModule } from 'angular2-highcharts';

import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';

//Import - Angular2 Log Services
import { Logger, Options } from "angular2-logger/core";
//import * as ng2log from 'angular2-logger/core';

import {Ng2PaginationModule} from 'ng2-pagination';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { LeftNavMenuComponent } from './shared/leftnav-menu/leftnav-menu.component';
import { FilterTreeViewComponent } from './shared/filter-treeview/filter-treeview';
import { FilterListViewComponent } from './shared/filter-listview/filter-listview.component';

import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { TabMenuComponent } from './shared/tab-menu/tab-menu.component';
import { ContentAreaComponent } from './shared/content-area/content-area.component';

import { MapsComponent } from './shared/maps/maps.component';
import { ChartComponent_Column } from './shared/charts-column/charts-column.component';
import { ChartComponent_Pie } from './shared/charts-pie/charts-pie.component';
import { ChartComponent_ColumnSpline } from './shared/charts-column-spline/charts-column-spline.component';
import { ChartComponent_LineMultiple } from './shared/charts-line-multiple/charts-line-multiple.component';

import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SPSComponent } from './sps/sps.component';
import { ESPComponent } from './esp/esp.component';
import { WPEComponent } from './wpe/wpe.component';
import { OSComponent } from './os/os.component';
import { SPSLossGainComponent } from './sps/sps-loss-gain/sps-loss-gain.component';
import { SPSOverviewComponent } from './sps/sps-overview/sps-overview.component';
import { SPSWellTestComponent } from './sps/sps-welltest-priority/sps-welltest-priority.component';
import { SPSAlarmsEventsComponent } from './sps/sps-alarms-events/sps-alarms-events.component';
import { jQueryComponent } from './jquery.component';
import { fixedHeight } from './dashboard-scroll.component';

// Create config options (see ILocalStorageServiceConfigOptions) for deets:
let localStorageServiceConfig = {
    prefix: 'koc-app',
    storageType: 'sessionStorage'
};

let loggingOptions = {
    //0.- Level.OFF, 1. - Level.ERROR, 2.- Level.WARN, 3.- Level.INFO, 4.- Level.DEBUG, 5.- Level.LOG
    level: 5, //How much detail you want to see in the logs; Level.ERROR (1) being the less detailed and Level.LOG (5) being the most. Defaults to Level.WARN (2).
    global: true, //Whether or not you want the created logger object to be exposed in the global scope. Defaults to true.
    store: false, //Whether you want the level config to be saved in the local storage so it doesn't get lost when you refresh. Defaults to false. 
};


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        ChartModule,
        Ng2PaginationModule
    ],
    declarations: [
        AppComponent,
        LayoutComponent,
        DashboardComponent,
        SPSComponent,
        ESPComponent,
        WPEComponent,
        OSComponent,
        LeftNavMenuComponent,
        FilterListViewComponent,
        FilterTreeViewComponent,
        MapsComponent,
        ChartComponent_Column,
        ChartComponent_Pie,
        ChartComponent_ColumnSpline,
        ChartComponent_LineMultiple,
        TopBarComponent,
        TabMenuComponent,
        ContentAreaComponent,
        SPSLossGainComponent,
        SPSOverviewComponent,
        SPSWellTestComponent,
        SPSAlarmsEventsComponent,
        jQueryComponent,
        fixedHeight
    ],
    bootstrap: [AppComponent],
    providers: [
        LocalStorageService,
        {
            provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig
        },
        Logger,
        {
            provide: Options, useValue: loggingOptions
        },
    ],
})
export class AppModule {

}
