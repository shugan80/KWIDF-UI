import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router }  from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { TabMenuComponent } from '../shared/tab-menu/tab-menu.component';

import { Filter } from '../shared/model/filter';
import { FilterDataService } from '../shared/services/filterdata.service';


@Component({

    selector: 'sps-component',
    templateUrl: 'app/sps/sps.component.html',
    providers: [FilterDataService]
})
export class SPSComponent {

     childPath: string = '/app/sps/config/sps.config.json';

}