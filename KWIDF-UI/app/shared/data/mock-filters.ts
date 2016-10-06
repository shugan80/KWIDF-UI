import { Filter } from '../model/filter';
import { TreeViewFilter } from '../model/filter';

//export const Filters: Filter[] = [
//    { id: 11, name: 'Subriyah' },
//    { id: 12, name: 'Raudhatain' },
//    { id: 13, name: 'Abdali' },
//    { id: 14, name: 'Ratqa' },
//    { id: 15, name: 'GC-23' },
//    { id: 16, name: 'GC-24' },
//    { id: 17, name: 'GC-120' },
//    { id: 18, name: 'Maddud' },
//    { id: 19, name: 'Upper Burgan' },
//    { id: 20, name: 'Lower Burgan' },
//    { id: 21, name: 'Engineer-1' },
//    { id: 22, name: 'Engineer-2' }
//];

export const TreeViewFilters: TreeViewFilter[] = [
    {
        id: 100,
        parentId: 0,
        name: 'North Kuwait',
        checked: false,
        expanded: true,
        children: [
            {
                id: 200,
                parentId: 100,
                name: 'Fields',
                checked: false,
                expanded: true,
                children: [
                    {
                        id: 201,
                        parentId: 200,
                        name: 'Subriyah',
                        checked: false,
                        expanded: false,
                        children: []
                    },
                    {
                        id: 202,
                        parentId: 200,
                        name: 'Raudhatain',
                        checked: false,
                        expanded: false,
                        children: []
                    },
                    {
                        id: 203,
                        parentId: 200,
                        name: 'Abdali',
                        checked: false,
                        expanded: false,
                        children: []
                    },
                    {
                        id: 204,
                        parentId: 200,
                        name: 'Ratqa',
                        checked: false,
                        expanded: false,
                        children: []
                    }
                ]
            },
            {
                id: 300,
                parentId: 1,
                name: 'CG',
                checked: false,
                expanded: true,
                children: [
                    {
                        id: 301,
                        parentId: 300,
                        name: 'CG-23',
                        checked: false,
                        expanded: false,
                        children: []
                    },
                    {
                        id: 302,
                        parentId: 300,
                        name: 'CG-24',
                        checked: false,
                        expanded: false,
                        children: []
                    },
                    {
                        id: 303,
                        parentId: 300,
                        name: 'CG-120',
                        checked: false,
                        expanded: false,
                        children: []
                    }
                ]
            },
            {
                id: 400,
                parentId: 100,
                name: 'Reservoirs',
                checked: false,
                expanded: true,
                children: [
                    {
                        id: 401,
                        parentId: 400,
                        name: 'Maddud',
                        checked: false,
                        expanded: false,
                        children: []
                    },
                    {
                        id: 402,
                        parentId: 400,
                        name: 'Upper Burgan',
                        checked: false,
                        expanded: false,
                        children: []
                    },
                    {
                        id: 403,
                        parentId: 400,
                        name: 'Lower Burgan',
                        checked: false,
                        expanded: false,
                        children: []
                    }
                ]
            },
            {
                id: 500,
                parentId: 100,
                name: 'Engineer',
                checked: true,
                expanded: true,
                children: [
                    {
                        id: 501,
                        parentId: 500,
                        name: 'MARIO',
                        checked: true,
                        expanded: false,
                        children: []
                    },
                    {
                        id: 501,
                        parentId: 500,
                        name: 'BAENEZI',
                        checked: true,
                        expanded: false,
                        children: []
                    },
                    {
                        id: 501,
                        parentId: 500,
                        name: 'TTWAITAN',
                        checked: true,
                        expanded: false,
                        children: []

                    },
                ]
            }
        ]
    }
];
