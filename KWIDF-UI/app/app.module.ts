import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { AppComponent }  from './app.component';
import { LeftNavMenuComponent } from './shared/leftnav-menu/leftnav-menu.component';
import { FilterTreeViewComponent } from './shared/filter-treeview/filter-treeview';

import { MapsComponent } from './shared/maps/maps.component';
import { ChartComponent_Column } from './shared/charts-column/charts-column.component';
import { ChartComponent_Pie } from './shared/charts-pie/charts-pie.component';


import { LayoutComponent }  from './layout/layout.component';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { SPSComponent }  from './sps/sps.component';
import { ESPComponent }   from './esp/esp.component';
import { WPEComponent }   from './wpe/wpe.component';
import { OSComponent }   from './os/os.component';


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
        ChartComponent_Pie
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    
}
