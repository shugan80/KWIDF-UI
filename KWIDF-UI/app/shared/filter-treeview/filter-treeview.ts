import { Component, Input } from '@angular/core';
import { HttpModule } from '@angular/http';

import { Filter } from '../model/filter';
import { TreeViewFilter } from '../model/filter';

import { FilterDataService } from '../services/filterdata.service';

@Component({

    selector: 'filter-tree-view',
    templateUrl: 'app/shared/filter-treeview/filter-treeview.component.html'
})
export class FilterTreeViewComponent {
    item: number = 0;
    filters: TreeViewFilter[];


    constructor(private filterDataService: FilterDataService) { }

    getFilters(): void {
        this.filterDataService.getFilters().then(filters => this.filters = filters);
    }

    ngOnInit(): void {
        console.log('filter-onit');
        this.getFilters();
        this.filterDataService.changeNav(this.item);

    }

    treeViewToggle(cFilter:TreeViewFilter) {
        cFilter.expanded = !cFilter.expanded;
    }

    treeViewGetIcon(cFilter: TreeViewFilter) {
        if (cFilter.expanded) {
            return 'iconButton';
        }
        return 'icondown';
    }
    
    onTreeViewChecked(cFilter: TreeViewFilter) {
        cFilter.checked = !cFilter.checked;
        this.clearSelectedCheckbox(cFilter);
        this.checkRecursiveFilters(cFilter, cFilter.checked);

        //console.log('onTreeViewChecked');
        this.filterDataService.publishFilterData(cFilter);
        this.filterDataService.changeNav(this.item);

    }

    checkRecursiveFilters(cFilter: TreeViewFilter, state: boolean) {
        cFilter.children.forEach(d => {
            d.checked = state;

            //Level 1
            d.children.forEach(d => {
                d.checked = state;

                //Level 2
                d.children.forEach(d => {
                    d.checked = state;
                });

            });

        });
    }

    clearSelectedCheckbox(cFilter: TreeViewFilter) {
        this.filters.forEach(c => {
            //Root
            if (c.id != cFilter.id) {
                c.checked = false;
            }

            //Level 1
            c.children.forEach(l => {

                if (l.id != cFilter.id) {
                    l.checked = false;
                } 

                //Level 2
                l.children.forEach(s => {
                    if (s.id != cFilter.id) {
                        s.checked = false;
                    }
                });
            });

        });

    }

}



