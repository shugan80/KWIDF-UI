import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Logger } from "angular2-logger/core";

import { ConfigDataService } from '../services/configdata.service';


@Component({
    selector: 'tab-menu',
    templateUrl: 'app/shared/tab-menu/tab-menu.component.html',
    providers: [ConfigDataService]
})

export class TabMenuComponent {
    @Input() filePath: string;
    public appContentMenuItems: any;

    constructor(private _logger: Logger, private _configDataService: ConfigDataService) {

    }

    ngOnInit() {
        this._configDataService.configJsonPath = this.filePath;
        this.getConfigItems();

    }

    private getConfigItems() {
        this._configDataService.getConfigItems().subscribe(
            (items: any) => {
                this.appContentMenuItems = items[0]
            },
            (err: any) => {
                this._logger.error(err);
            },
            () => {
                this._logger.log(' TabMenuComponent getConfigItems - done');

            }
            // No error or completion callbacks here. They are optional, but
            // you will get this._logger. errors if the Observable is in an error state.
        );
    }

}
