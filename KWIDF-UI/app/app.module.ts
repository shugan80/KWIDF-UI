import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

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

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing],
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
        SPSOverviewComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    
}
