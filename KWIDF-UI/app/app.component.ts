import { Component } from '@angular/core';
import { ConfigDataService } from './shared/services/configdata.service';
import { GlobalDataService } from './shared/services/globaldata.service';
import { HelperService } from './shared/services/helper.service';

@Component({
    moduleId: module.id,
    selector: 'koc-app',
    templateUrl: './layout/layout.html',
    styleUrls: ['./css/landingpage.css'],
    providers: [ConfigDataService, GlobalDataService, HelperService]
})
export class AppComponent {
    constructor(private _globalDataService: GlobalDataService) {
        
    }

    ngOnInit() {
        //this._globalDataService.getConfigItems();
    }
}
