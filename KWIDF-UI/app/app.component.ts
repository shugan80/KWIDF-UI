import { Component } from '@angular/core';
import { ConfigDataService } from './shared/services/configdata.service';
import { HelperService } from './shared/services/helper.service';

@Component({
    moduleId: module.id,
    selector: 'koc-app',
    templateUrl: './layout/layout.html',
    styleUrls: ['./css/landingpage.css'],
    providers: [ConfigDataService, HelperService]
})
export class AppComponent {
    constructor() {
        
    }

    ngOnInit() {
        
    }
}
