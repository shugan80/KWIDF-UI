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

    filterObj: Filter;
    public finalfilters: Array<TreeViewFilter>;

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
        return Promise.resolve(TreeViewFilters);
    }
    // See the "Take it slow" appendix
    getFiltersSlowly(): Promise<TreeViewFilter[]> {
        return new Promise<TreeViewFilter[]>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() => this.getFilters());
    }

    DirectoryProcess(objrootDirectories: Array<TreeViewFilter>) {
        let rootDirs = this.Traverse(objrootDirectories);
        console.log(rootDirs);
        return rootDirs;
    }

    Traverse(objDirs: Array<TreeViewFilter>) {
        let directoriesList: TreeViewFilter[] = [];
        for (let dir of objDirs) {
            let obj = new TreeViewFilter();
            obj.name = dir.name;
            let child = this.Traverse(dir.children);
            obj.children = child;
            directoriesList.push(obj);
        }
        return directoriesList;
    }

    getCurrentFilters() {
        return this.filterObj;

    }

    publishFilterData(filter: Filter) {
        this.filterObj = filter;
        console.log(filter);
    }

}