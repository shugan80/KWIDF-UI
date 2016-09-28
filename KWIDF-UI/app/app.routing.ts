import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent }  from './layout/layout.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { SPSComponent }  from './sps/sps.component';
import { ESPComponent }   from './esp/esp.component';
import { WPEComponent }   from './wpe/wpe.component';
import { OSComponent }   from './os/os.component';


const appRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'sps',
        component: SPSComponent
    },
    {
        path: 'esp',
        component: ESPComponent
    },
    {
        path: 'wpe',
        component: WPEComponent
    },
    {
        path: 'os',
        component: OSComponent
    },
    {
        path: '',
        component: DashboardComponent
    },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
