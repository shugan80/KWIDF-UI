﻿export class Filter {
    id: number;
    name: string;
}
export class TreeViewFilter {
    id: number;
    parentId: number;
    name: string;
    checked: boolean;
    expanded: boolean;
    children: Array<TreeViewFilter>;
    style?: string;
}