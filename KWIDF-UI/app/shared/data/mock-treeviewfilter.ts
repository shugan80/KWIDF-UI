import { TreeViewFilter  } from '../model/filter';

export const TreeViewFilters: TreeViewFilter[] = [
    {
        id: 1,
        parentId: 1,
        name: 'North Kuwait',
        children: [
            {
                id: 2,
                parentId: 1,
                name: 'Fields',
                children: [
                    {
                        id: 4,
                        parentId: 2,
                        name: 'Subriyah',
                        children: []
                    },
                    {
                        id: 5,
                        parentId: 2,
                        name: 'Raudhatain',
                        children: []
                    }
                ]
            },
            {
                id: 3,
                parentId: 1,
                name: 'CG',
                children: [
                    {
                        id: 6,
                        parentId: 3,
                        name: 'CG-23',
                        children: []
                    },
                    {
                        id: 7,
                        parentId: 3,
                        name: 'CG-24',
                        children: []
                    }
                ]
            }
        ]
    }
];