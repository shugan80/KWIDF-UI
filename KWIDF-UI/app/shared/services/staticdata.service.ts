import { Injectable } from '@angular/core';
import { KeyValueData } from '../model/key-value';
import { SPS_OverView_WellEvents_DATA } from '../data/mock-data-wellEvents';
import { SPS_OverView_WellStatus_DATA } from '../data/mock-data-wellEvents';
import { SPS_LossGain_Production_DATA } from '../data/mock-data-wellEvents';



@Injectable()
export class StaticDataService {
    get_columnChart_Data(): Promise<KeyValueData[]> {
        return Promise.resolve(SPS_OverView_WellEvents_DATA);
    }

    get_pieChart_Data(componentType:string): Promise<KeyValueData[]> {
        if (componentType === "sps-overview-wellStatus") {
            return Promise.resolve(SPS_OverView_WellStatus_DATA);
        }
        else {
            return Promise.resolve(SPS_LossGain_Production_DATA);
        }
    }
}