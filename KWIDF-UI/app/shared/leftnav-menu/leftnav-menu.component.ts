import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Logger } from "angular2-logger/core";

import { GlobalDataService } from '../services/globaldata.service';

@Component({
    moduleId: module.id,
    selector: 'app-leftnav-nenu',
    templateUrl: './leftnav-menu.component.html',
    providers: [GlobalDataService]
})
export class LeftNavMenuComponent {
    public appConfigItems: any;

    constructor(private _logger: Logger, private _globalDataService: GlobalDataService) {
    }

    ngOnInit() {
        this._logger.log('LeftNavMenuComponent');
        let configItems = this._globalDataService.getAppConfigItems();
        this.appConfigItems = configItems;
    }

}
