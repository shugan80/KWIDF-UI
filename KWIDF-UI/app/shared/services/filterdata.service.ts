import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Filter } from '../model/filter';
//import { Filters } from '../data/mock-filters';

import { TreeViewFilter } from '../model/filter';
import { TreeViewFilters } from '../data/mock-filters';

@Injectable()
export class FilterDataService {

    private filterObj: TreeViewFilter;
    finalfilters: Array<TreeViewFilter>;

    // Observable navItem source
    private _navItemSource = new BehaviorSubject<number>(0);

    // Observable navItem stream
    navItem$ = this._navItemSource.asObservable();

    // service command
    changeNav(number:number) {
        this._navItemSource.next(number);
    }


    getFilters(): Promise<TreeViewFilter[]> {
        this.finalfilters = this.DirectoryProcess(TreeViewFilters);
        return Promise.resolve(this.finalfilters);
    }
    // See the "Take it slow" appendix
    getFiltersSlowly(): Promise<TreeViewFilter[]> {
        return new Promise<TreeViewFilter[]>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() => this.getFilters());
    }

    DirectoryProcess(objrootDirectories: Array<TreeViewFilter>) {
        let rootDirs = this.Traverse(objrootDirectories);
        this.filterObj = rootDirs[0].children.find(x=> x.checked == true);
        return rootDirs;
    }

    Traverse(objDirs: Array<TreeViewFilter>) {
        let directoriesList: TreeViewFilter[] = [];
        for (let dir of objDirs) {
            let obj = new TreeViewFilter();
            obj.id = dir.id;
            obj.parentId = dir.parentId;
            obj.name = dir.name;
            obj.expanded = dir.expanded;
            obj.checked = dir.checked;
            let child = this.Traverse(dir.children);
            obj.children = child;
            directoriesList.push(obj);
        }
        return directoriesList;
    }

    getCurrentFilters() {
        return this.filterObj;

    }

    publishFilterData(filter: TreeViewFilter) {
        this.filterObj = filter;
    }

}