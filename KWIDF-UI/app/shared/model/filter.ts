export class Filter {
    id: number;
    name: string;
}

//export class TreeViewFilter {
//    id: number;
//    parentId: number;
//    name: string;
//    children: Array<TreeViewFilter>
//}

export class TreeViewFilter {
    id: number;
    text: string;
    expanded: boolean;
    spriteCssClass: string;
    items: any;
}