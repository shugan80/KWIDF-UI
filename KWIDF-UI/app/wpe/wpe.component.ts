import { Component } from '@angular/core';
import { Router }  from '@angular/router';

declare var jscustom: any;

@Component({
    moduleId: module.id,
    selector: 'wpe',
    templateUrl: './wpe.component.html'
})
export class WPEComponent {
    // jscustom: any;
    constructor(
        private router: Router) {
    }
    //ngOnInit() {
    //    this.jscustom = new jscustom();
    //    jscustom.type();
    //}
}