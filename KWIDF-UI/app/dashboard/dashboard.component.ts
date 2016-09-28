import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router }  from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'dashboard-filter',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

    constructor(
        private router: Router) {
    }

    ngOnInit(): void {
        
    }
    
}