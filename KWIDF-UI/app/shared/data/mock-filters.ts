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
        level: '',
        checked: false,
        expanded: true,
        style: '',
        children: [
            {
                id: 200,
                parentId: 100,
                name: 'Fields',
                level: 'typeId',
                checked: false,
                expanded: true,
                style: '',
                children: [
                    {
                        id: 201,
                        parentId: 200,
                        name: 'Subriyah',
                        level: 'fieldId',
                        checked: false,
                        expanded: false,
                        style: '',
                        children: []
                    },
                    {
                        id: 202,
                        parentId: 200,
                        name: 'Raudhatain',
                        level: 'fieldId',
                        checked: false,
                        expanded: false,
                        style: '',
                        children: []
                    },
                    {
                        id: 203,
                        parentId: 200,
                        name: 'Abdali',
                        level: 'fieldId',
                        checked: false,
                        expanded: false,
                        style: '',
                        children: []
                    },
                    {
                        id: 204,
                        parentId: 200,
                        name: 'Ratqa',
                        level: 'fieldId',
                        checked: false,
                        expanded: false,
                        style: '',
                        children: []
                    }
                ]
            },
            {
                id: 300,
                parentId: 1,
                name: 'CG',
                level: 'typeId',
                checked: false,
                expanded: true,
                style: '',
                children: [
                    {
                        id: 301,
                        parentId: 300,
                        name: 'CG-23',
                        level: 'fieldId',
                        checked: false,
                        expanded: false,
                        style: '',
                        children: []
                    },
                    {
                        id: 302,
                        parentId: 300,
                        name: 'CG-24',
                        level: 'fieldId',
                        checked: false,
                        expanded: false,
                        style: '',
                        children: []
                    },
                    {
                        id: 303,
                        parentId: 300,
                        name: 'CG-120',
                        level: 'fieldId',
                        checked: false,
                        expanded: false,
                        style: '',
                        children: []
                    }
                ]
            },
            {
                id: 400,
                parentId: 100,
                name: 'Reservoirs',
                level: 'typeId',
                checked: false,
                expanded: true,
                style: '',
                children: [
                    {
                        id: 401,
                        parentId: 400,
                        name: 'Maddud',
                        level: 'fieldId',
                        checked: false,
                        expanded: false,
                        style: '',
                        children: []
                    },
                    {
                        id: 402,
                        parentId: 400,
                        name: 'Upper Burgan',
                        level: 'fieldId',
                        checked: false,
                        expanded: false,
                        style: '',
                        children: []
                    },
                    {
                        id: 403,
                        parentId: 400,
                        name: 'Lower Burgan',
                        level: 'fieldId',
                        checked: false,
                        expanded: false,
                        style: '',
                        children: []
                    }
                ]
            },
            {
                id: 500,
                parentId: 100,
                name: 'Engineer',
                level: 'typeId',
                checked: true,
                expanded: true,
                style: '',
                children: [
                    {
                        id: 501,
                        parentId: 500,
                        name: 'MARIO',
                        level: 'fieldId',
                        checked: true,
                        expanded: false,
                        style: '',
                        children: []
                    },
                    {
                        id: 502,
                        parentId: 500,
                        name: 'BAENEZI',
                        level: 'fieldId',
                        checked: true,
                        expanded: false,
                        style: '',
                        children: []
                    },
                    {
                        id: 503,
                        parentId: 500,
                        name: 'TTWAITAN',
                        level: 'fieldId',
                        checked: true,
                        expanded: false,
                        style: '',
                        children: []

                    },
                ]
            }
        ]
    }
];
