
export interface KeyValueData {
    key: string;
    value: number;
    properties: Object;
}

export interface KeyValueObject {
    id: number;
    data: Array<KeyValueData>;
}