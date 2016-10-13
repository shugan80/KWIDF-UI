import { Component } from '@angular/core';
import { Logger } from "angular2-logger/core";

import { ConfigDataService } from './shared/services/configdata.service';
import { HelperService } from './shared/services/helper.service';
import { GlobalDataService } from './shared/services/globaldata.service';


@Component({
    moduleId: module.id,
    selector: 'koc-app',
    templateUrl: './layout/layout.html',
    styleUrls: ['./css/landingpage.css'],
    providers: [ConfigDataService, HelperService, GlobalDataService]
})
export class AppComponent {

    constructor(private _logger: Logger, private _configDataService: ConfigDataService, private _globalDataService: GlobalDataService) {
        this._logger.log('AppComponent loaded...');
    }

    ngOnInit() {
        
        if (this._globalDataService.getAppConfigItems() == null) {
            this._configDataService.configJsonPath = '/app/config/app.config.json';
            this.getConfigItems();
        }
    }

    private getConfigItems() {

        let appConfigItems = this._configDataService.getAppConfigItems();
        this._globalDataService.setAppConfigItems(appConfigItems);
        this.getSPSModuleConfigItems();
    }

    private getSPSModuleConfigItems() {

        let moduleConfigItems = this._configDataService.getModuleConfigItems('sps');
        this._globalDataService.setModuleConfigItems(moduleConfigItems);
        
    }
}
