import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-top-bar',
    templateUrl: 'app/shared/top-bar/top-bar.component.html'
})
export class TopBarComponent {
    breadcrumbs: any;
    title: string;
    constructor(private router: Router, private route: ActivatedRoute) { }
    ngOnInit() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(event => {  // note, we don't use event
                this.breadcrumbs = [];

                let currentRoute = this.route.root,
                    url = '';
                do {
                    let childrenRoutes = currentRoute.children;
                    currentRoute = null;
                    childrenRoutes.forEach(route => {
                        if (route.outlet === 'primary') {
                            let routeSnapshot = route.snapshot;
                            //console.log('snapshot:', routeSnapshot);
                            url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
                            var breadCrumData: any = route.snapshot.data;
                            this.breadcrumbs.push({
                                label: breadCrumData.breadcrumb,
                                url: url
                            });
                            this.title = breadCrumData.title;
                            currentRoute = route;
                        }
                    })
                } while (currentRoute);
            })
    }
}
