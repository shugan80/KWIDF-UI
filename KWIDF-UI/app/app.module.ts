import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

//Import High charts
import { CHART_DIRECTIVES } from 'angular2-highcharts'; //V0.2.1

import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';

//Import - Angular2 Log Services
//import {Logger} from 'angular2-logger/core';
//import * as ng2log from 'angular2-logger/core';



import { routing } from './app.routing';
import { AppComponent }  from './app.component';
import { LeftNavMenuComponent } from './shared/leftnav-menu/leftnav-menu.component';
import { FilterTreeViewComponent } from './shared/filter-treeview/filter-treeview';

import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { TabMenuComponent } from './shared/tab-menu/tab-menu.component';
import { ContentAreaComponent } from './shared/content-area/content-area.component';

import { MapsComponent } from './shared/maps/maps.component';
import { ChartComponent_Column } from './shared/charts-column/charts-column.component';
import { ChartComponent_Pie } from './shared/charts-pie/charts-pie.component';

import { LayoutComponent }  from './layout/layout.component';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { SPSComponent }  from './sps/sps.component';
import { ESPComponent }   from './esp/esp.component';
import { WPEComponent }   from './wpe/wpe.component';
import { OSComponent }   from './os/os.component';
import { SPSLossGainComponent }  from './sps/sps-loss-gain/sps-loss-gain.component';
import { SPSOverviewComponent }  from './sps/sps-overview/sps-overview.component';
import { SPSWellTestComponent }  from './sps/sps-welltest-priority/sps-welltest-priority.component';
import { SPSAlarmsEventsComponent }  from './sps/sps-alarms-events/sps-alarms-events.component';
import { jQueryComponent }  from './jquery.component';
import { fixedHeight}  from './dashboard-scroll.component';

// Create config options (see ILocalStorageServiceConfigOptions) for deets:
let localStorageServiceConfig = {
    prefix: 'koc-app',
    storageType: 'sessionStorage'
};


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        //ng2log.Logger
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
        FilterTreeViewComponent,
        MapsComponent,
        ChartComponent_Column,
        ChartComponent_Pie,
        TopBarComponent,
        TabMenuComponent,
        ContentAreaComponent,
        SPSLossGainComponent,
        SPSOverviewComponent,
		CHART_DIRECTIVES,
        SPSWellTestComponent,
        SPSAlarmsEventsComponent,
        jQueryComponent,
        fixedHeight
    ],
    bootstrap: [AppComponent],
    //providers: [ng2log.Logger]
    providers: [
        LocalStorageService,
        {
            provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig
        }
    ],
})
export class AppModule {
       
}
