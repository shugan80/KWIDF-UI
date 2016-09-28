import {Injectable} from '@angular/core';
import { HttpModule } from '@angular/http';
import {Observable } from 'rxjs/Rx';
import { ConfigDataService } from './configdata.service';

@Injectable()
export class GlobalDataService {
    public appConfigItems: any;
    constructor(private _configDataService: ConfigDataService) {
        this._configDataService.configJsonPath = '/app/config/app.config.json';
    }



    getConfigItems() {
        this._getJsonData();
    }

    private _getJsonData() {
        this._configDataService.getConfigItems().subscribe(
            (items: any) => {
                this.appConfigItems = items[0]
            },
            (err: any) => {
                console.error(err);
            },
            () => {
                console.log('GlobalDataService _getJsonData - done');
            }
            // No error or completion callbacks here. They are optional, but
            // you will get console errors if the Observable is in an error state.
        );
        return this.appConfigItems;
    }
}