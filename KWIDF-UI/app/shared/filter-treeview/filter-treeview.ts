import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';

import { TreeViewFilter } from '../model/filter';
import { FilterDataService } from '../services/filterdata.service';



declare var jQuery: any;

@Component({
    moduleId: module.id,
    selector: 'tree-view',
    templateUrl: './filter-treeview.component.html',
    providers: [FilterDataService]
})
export class FilterTreeViewComponent {

    public filters: TreeViewFilter[];
    public filtersData: TreeViewFilter[];

    constructor(private filterDataService: FilterDataService) { }

    ngOnInit(): void {
        console.log('filter-onit');
        //this.getFilters();
    }

    getFilters(): void {
        this.filterDataService.getFilters().then(filters => this.filtersData = filters);
    }

    setFilters(data: any) {
        this.filtersData = data;
        this.renderChart();
    }
    
    ngAfterViewInit() {
        this.filterDataService.getFilters().then(filters => this.setFilters(filters));
    }

    renderChart() {
        jQuery("#treeview").kendoTreeView({
            checkboxes: {
                checkChildren: true
            },

            check: this.onCheck,

            dataSource: this.filtersData
        });
    }

    onCheck() {
        var self = this;
        let checkedNodes: Array<string> = [];
        let treeView = jQuery("#treeview").data("kendoTreeView");
        let message = '';
        this.filters = [];


        //this.checkedNodeIds(treeView.dataSource.view(), checkedNodes);
        let nodes: any = treeView.dataSource.view();
        for (var i = 0; i < nodes.length; i++) {
            let tvFilter: TreeViewFilter;
            if (nodes[i].checked) {
                checkedNodes.push(nodes[i].id);

                tvFilter = new TreeViewFilter();
                tvFilter.id = nodes[i].id;
                tvFilter.expanded = nodes[i].expanded;
                tvFilter.items = nodes[i].items;
                tvFilter.spriteCssClass = nodes[i].spriteCssClass;
                tvFilter.text = nodes[i].text;

                this.filters.push(tvFilter);
            }
            if (nodes[i].hasChildren) {
                let firstLevelChildren = nodes[i].children.view();
                for (var j = 0; j < firstLevelChildren.length; j++) {
                    if (firstLevelChildren[j].checked) {
                        checkedNodes.push(firstLevelChildren[j].id);

                        tvFilter = new TreeViewFilter();
                        tvFilter.id = firstLevelChildren[j].id;
                        tvFilter.expanded = firstLevelChildren[j].expanded;
                        tvFilter.items = firstLevelChildren[j].items;
                        tvFilter.spriteCssClass = firstLevelChildren[j].spriteCssClass;
                        tvFilter.text = firstLevelChildren[j].text;

                        this.filters.push(tvFilter);
                    }
                    if (firstLevelChildren[j].hasChildren) {
                        let secondLevelChildren = firstLevelChildren[j].children.view();
                        for (var k = 0; k < secondLevelChildren.length; k++) {
                            if (secondLevelChildren[k].checked) {
                                checkedNodes.push(secondLevelChildren[k].id);

                                tvFilter = new TreeViewFilter();
                                tvFilter.id = secondLevelChildren[k].id;
                                tvFilter.expanded = secondLevelChildren[k].expanded;
                                tvFilter.items = secondLevelChildren[k].items;
                                tvFilter.spriteCssClass = secondLevelChildren[k].spriteCssClass;
                                tvFilter.text = secondLevelChildren[k].text;

                                this.filters.push(tvFilter);
                            }
                        }
                    }
                }

            }
        }

        if (checkedNodes.length > 0) {
            message = "IDs of checked nodes: " + checkedNodes.join(",");
        } else {
            message = "No nodes checked.";
        }


        console.log(this.filters);
        jQuery("#result").html(message);
    }

    //checkedNodeIds(nodes: any, checkedNodes: any) {
    //    for (var i = 0; i < nodes.length; i++) {
    //        if (nodes[i].checked) {
    //            checkedNodes.push(nodes[i].id);
    //        }

    //        if (nodes[i].hasChildren) {
    //            this.checkedNodeIds(nodes[i].children.view(), checkedNodes);
    //        }
    //    }
    //}

    //onSelect(filter: Filter): void {
    //    this.selectedFilter = filter;
    //    console.log('onSelect');
    //}

}



