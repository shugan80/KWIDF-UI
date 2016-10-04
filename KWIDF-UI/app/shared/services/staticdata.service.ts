import { Injectable } from '@angular/core';
import { KeyValueData } from '../model/key-value';
import { WellEvents_DATA } from '../data/mock-data-wellEvents';



@Injectable()
export class StaticDataService {
    get_columnChart_Data(): Promise<KeyValueData[]> {
        return Promise.resolve(WellEvents_DATA);
    }
}