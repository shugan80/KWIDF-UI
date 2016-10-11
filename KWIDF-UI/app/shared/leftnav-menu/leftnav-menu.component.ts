import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Logger } from "angular2-logger/core";

import { ConfigDataService } from '../services/configdata.service';
import { GlobalDataService } from '../services/globaldata.service';

@Component({
    moduleId: module.id,
    selector: 'app-leftnav-nenu',
    templateUrl: './leftnav-menu.component.html',
    providers: [ConfigDataService, GlobalDataService]
})
export class LeftNavMenuComponent {
    public appConfigItems: any;

    constructor(private _logger: Logger, private _configDataService: ConfigDataService,
        private _globalDataService: GlobalDataService) {
    }

    ngOnInit() {
        this._logger.log('LeftNavMenuComponent');
        let configItems = this._globalDataService.getAppConfigItems();
        if (configItems == null) {
            this._configDataService.configJsonPath = '/app/config/app.config.json';
            this.getConfigItems();
        }
        else {
            this.appConfigItems = configItems;
        }
    }

    private getConfigItems() {
        this._configDataService.getConfigItems().subscribe(
            (items: any) => {
                this.appConfigItems = items[0];
                this._globalDataService.setAppConfigItems(this.appConfigItems);
            },
            (err: any) => {
                this._logger.error(err);
            },
            () => {
                this._logger.log(' LeftNavMenuComponent getConfigItems - done');
            }
            // No error or completion callbacks here. They are optional, but
            // you will get this._logger. errors if the Observable is in an error state.
        );
    }

}
