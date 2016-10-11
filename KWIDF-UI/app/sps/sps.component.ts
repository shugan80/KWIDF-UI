import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router }  from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Logger } from "angular2-logger/core";

import { ConfigDataService } from '../shared/services/configdata.service';
import { GlobalDataService } from '../shared/services/globaldata.service';
import { FilterDataService } from '../shared/services/filterdata.service';

@Component({

    selector: 'sps-component',
    templateUrl: 'app/sps/sps.component.html',
    providers: [FilterDataService, GlobalDataService]
})
export class SPSComponent {

    constructor(private _logger: Logger, private _globalDataService: GlobalDataService) {

    }

    appConfigItems: any = this._globalDataService.getAppConfigItems();
    childPath: string = this.appConfigItems.sps_config_path;


    ngOnInit() {
        this._logger.log(' SPSComponent ngOnInit');
    }

   
}