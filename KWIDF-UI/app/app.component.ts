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

        this._configDataService.getConfigItems().subscribe(
            (items: any) => {
                let appConfigItems = items[0];
                this._globalDataService.setAppConfigItems(appConfigItems);
            },
            (err: any) => {
                this._logger.error(err);
            },
            () => {
                this._logger.log(' AppComponent getConfigItems - done');
                let appConfigItems: any = this._globalDataService.getAppConfigItems();
                if (appConfigItems == null) {
                    throw new Error("App config items not loaded!"); 
                }
                else {
                    this._configDataService.configJsonPath = appConfigItems.sps_config_path;
                    this.getSPSModuleConfigItems();
                }
            }
            // No error or completion callbacks here. They are optional, but
            // you will get this._logger. errors if the Observable is in an error state.
        );
    }

    private getSPSModuleConfigItems() {
        
        this._configDataService.getConfigItems().subscribe(
            (items: any) => {
                let appConfigItems = items[0];
                this._globalDataService.setModuleConfigItems(appConfigItems);
            },
            (err: any) => {
                this._logger.error(err);
            },
            () => {
                this._logger.log(' AppComponent getSPSModuleConfigItems - done');
            }
            // No error or completion callbacks here. They are optional, but
            // you will get this._logger. errors if the Observable is in an error state.
        );
    }
}
