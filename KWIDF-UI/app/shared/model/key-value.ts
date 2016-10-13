
export interface KeyValueData {
    key: Object;
    value: number;
    properties: Object;
}

export interface KeyValueObject {
    id: number;
    data: Array<KeyValueData>;
}

export interface KeyValueDataArray {
    data: Array<KeyValueData>;
    properties: Object;
}

export interface KeyValueDataArrayObject {
    id: number;
    collection: Array<KeyValueDataArray>;
}