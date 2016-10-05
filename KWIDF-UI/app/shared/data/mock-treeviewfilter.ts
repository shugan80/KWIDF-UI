import { TreeViewFilter  } from '../model/filter';

//export const TreeViewFilters: TreeViewFilter[] = [
//    {
//        id: 1,
//        parentId: 1,
//        name: 'North Kuwait',
//        children: [
//            {
//                id: 2,
//                parentId: 1,
//                name: 'Fields',
//                children: [
//                    {
//                        id: 4,
//                        parentId: 2,
//                        name: 'Subriyah',
//                        children: []
//                    },
//                    {
//                        id: 5,
//                        parentId: 2,
//                        name: 'Raudhatain',
//                        children: []
//                    }
//                ]
//            },
//            {
//                id: 3,
//                parentId: 1,
//                name: 'CG',
//                children: [
//                    {
//                        id: 6,
//                        parentId: 3,
//                        name: 'CG-23',
//                        children: []
//                    },
//                    {
//                        id: 7,
//                        parentId: 3,
//                        name: 'CG-24',
//                        children: []
//                    }
//                ]
//            }
//        ]
//    }
//];


export const TreeViewFilters: TreeViewFilter[] = [{
    id: 100, text: "North Kuwait", expanded: true, spriteCssClass: "rootfolder", items: [
        {
            id: 200, text: "Fields", expanded: true, spriteCssClass: "folder", items: [
                { id: 201, text: "Subriyah", spriteCssClass: "html", items: [] },
                { id: 202, text: "Raudhatain", spriteCssClass: "html", items: []  },
                { id: 203, text: "Abdali", spriteCssClass: "image", items: []  },
                { id: 204, text: "Ratqa", spriteCssClass: "image", items: []  }
            ]
        },
        {
            id: 300, text: "GC", expanded: true, spriteCssClass: "folder", items: [
                { id: 301, text: "GC-23", spriteCssClass: "image", items: []  },
                { id: 302, text: "GC-24", spriteCssClass: "pdf", items: []  },
                { id: 303, text: "GC-120", spriteCssClass: "pdf", items: []  },
            ]
        },
        {
            id: 400, text: "Reservoirs", expanded: true, spriteCssClass: "folder", items: [
                { id: 401, text: "Maddud", spriteCssClass: "pdf", items: []  },
                { id: 402, text: "Upper Burgan", spriteCssClass: "pdf", items: []  },
                { id: 403, text: "Lower Burgan", spriteCssClass: "pdf", items: []  }
            ]
        },
        {
            id: 500, text: "Engineer", expanded: true, spriteCssClass: "folder", items: [
                { id: 501, text: "MARIO", spriteCssClass: "pdf", items: []  },
                { id: 502, text: "BAENEZI", spriteCssClass: "pdf", items: []  },
                { id: 503, text: "TTWAITAN", spriteCssClass: "pdf", items: []  }
            ]
        }
    ]
}]