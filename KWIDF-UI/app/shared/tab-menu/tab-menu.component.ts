import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Logger } from "angular2-logger/core";

import { GlobalDataService } from '../services/globaldata.service';


@Component({
    selector: 'tab-menu',
    templateUrl: 'app/shared/tab-menu/tab-menu.component.html',
    providers: [GlobalDataService]
})

export class TabMenuComponent {
    @Input() filePath: string;
    public appContentMenuItems: any;

    constructor(private _logger: Logger, private _globalDataService: GlobalDataService) {

    }

    ngOnInit() {
        this.getConfigItems();

    }

    private getConfigItems() {
        this.appContentMenuItems = this._globalDataService.getModuleConfigItems();
    }

}
