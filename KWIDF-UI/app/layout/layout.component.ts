import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from "angular2-logger/core";

declare var jscustom: any;

@Component({
    moduleId: module.id,
    selector: 'layout',
    templateUrl: './layout.html'
})
export class LayoutComponent {
    // jscustom: any;
    constructor(private _logger: Logger,
        private router: Router) {
        this._logger.log('LayoutComponent constructor...');
    }
    ngOnInit() {
        this._logger.log('LayoutComponent init');
    }
}