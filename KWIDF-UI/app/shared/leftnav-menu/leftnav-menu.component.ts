import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import {Observable } from 'rxjs/Rx';
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

    constructor(private _configDataService: ConfigDataService, private _globalDataService: GlobalDataService) {
    }
    
    ngOnInit() {
        this._configDataService.configJsonPath = '/app/config/app.config.json';
        this.getConfigItems();
    }

    private initComponent() {
        console.log(' LeftNavMenuComponent initComponent - done');
    }

    private getConfigItems() {
        this._configDataService.getConfigItems().subscribe(
            (items:any) => {
                this.appConfigItems = items[0]
            },
            (err:any) => {
                console.error(err);
            },
            () => {
                console.log(' LeftNavMenuComponent getConfigItems - done');
                this.initComponent();
            }
            // No error or completion callbacks here. They are optional, but
            // you will get console errors if the Observable is in an error state.
        );
    }

}
