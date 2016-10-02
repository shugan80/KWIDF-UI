import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent }  from './layout/layout.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { SPSComponent }  from './sps/sps.component';
import { ESPComponent }   from './esp/esp.component';
import { WPEComponent }   from './wpe/wpe.component';
import { OSComponent }   from './os/os.component';
import { SPSLossGainComponent }  from './sps/sps-loss-gain/sps-loss-gain.component';
import { SPSOverviewComponent }  from './sps/sps-overview/sps-overview.component';

const appRoutes: Routes = [
    //{
    //    path: 'dashboard',
    //    component: DashboardComponent,
    //    data: { breadcrumb: 'HOME', title: 'HOME' }
    //},
    //{
    //    path: 'sps',
    //    component: SPSComponent,
    //    data: { breadcrumb: 'SPS', title: 'SPS' },
    //    //children: [
    //    //    { path: 'overview', component: SPSOverviewComponent, data: { breadcrumb: 'Overview', title: 'SPS Overview' } },
    //    //    { path: 'lossgain', component: SPSLossGainComponent, data: { breadcrumb: 'Loss & Gains', title: 'SPS Loss & Gains' } },
    //    //    { path: '', component: SPSOverviewComponent, data: { breadcrumb: 'Overview', title: 'SPS Overview' } }
           
    //    //]
    //},
    //{
    //    path: 'sps/overview',
    //    component: SPSOverviewComponent,
    //    data: { breadcrumb: 'Overview', title: 'SPS Overview' }
    //},
    //{
    //    path: 'sps/loss-gain',
    //    component: SPSLossGainComponent,
    //    data: { breadcrumb: 'Loss & Gains', title: 'SPS Loss & Gains' }
    //},
    //{
    //    path: 'esp',
    //    component: ESPComponent,
    //    data: { breadcrumb: 'ESP', title: 'ESP' }
    //},
    //{
    //    path: 'wpe',
    //    component: WPEComponent,
    //    data: { breadcrumb: 'WPE', title: 'WPE' }
    //},
    //{
    //    path: 'os',
    //    component: OSComponent,
    //    data: { breadcrumb: 'OS', title: 'OS' }
    //},
    //{
    //    path: '',
    //    redirectTo: '/dashboard',
    //    pathMatch: 'full'
    //},
    {
        path: '',
        data: { breadcrumb: 'Home', title: 'HOME' },
        children: [

            {
                path: 'dashboard',
                component: DashboardComponent,
                data: { breadcrumb: 'Dashboard', title: 'Dashboard' }
            },
            {
                path: 'sps',
               
                data: { breadcrumb: 'SPS', title: 'SPS' },
                children: [
                    
                    { path: 'overview', component: SPSOverviewComponent, data: { breadcrumb: 'Overview', title: 'SPS Overview' } },
                    { path: 'lossgain', component: SPSLossGainComponent, data: { breadcrumb: 'Loss & Gains', title: 'SPS Loss & Gains' } },


                ]
            },
            {
                path: 'esp',
                component: ESPComponent,
                data: { breadcrumb: 'ESP', title: 'ESP' }
            },
            {
                path: 'wpe',
                component: WPEComponent,
                data: { breadcrumb: 'WPE', title: 'WPE' }
            },
            {
                path: 'os',
                component: OSComponent,
                data: { breadcrumb: 'OS', title: 'OS' }
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
