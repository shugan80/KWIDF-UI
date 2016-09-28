import { Component } from '@angular/core';
import { Router }  from '@angular/router';

declare var jscustom: any;

@Component({
    moduleId: module.id,
    selector: 'esp',
    templateUrl: './esp.component.html'
})
export class ESPComponent {
    // jscustom: any;
    constructor(
        private router: Router) {
    }
    //ngOnInit() {
    //    this.jscustom = new jscustom();
    //    jscustom.type();
    //}
}