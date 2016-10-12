export class Filter {
    id: number;
    name: string;
}
export class TreeViewFilter {
    id: number;
    parentId: number;
    name: string;
    level: string;
    checked: boolean;
    expanded: boolean;
    children: Array<TreeViewFilter>;
    style: string;
}
export class ListViewFilter {
    wellId: number;
    typeId: number;
    fieldId: number;
    wellName: string;
}

export class DateFilter {
    id: number;
    name: string;
}