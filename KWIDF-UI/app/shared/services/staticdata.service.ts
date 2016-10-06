import { Injectable } from '@angular/core';
import { KeyValueData } from '../model/key-value';
import { SPS_OverView_WellEvents_DATA } from '../data/mock-data-sps-overview';
import { SPS_OverView_WellStatus_DATA } from '../data/mock-data-sps-overview';
import { SPS_LossGain_Production_DATA } from '../data/mock-data-sps-overview';



@Injectable()
export class StaticDataService {
    get_columnChart_Data(): Promise<KeyValueData[]> {
        return Promise.resolve(SPS_OverView_WellEvents_DATA);
    }

    get_pieChart_Data(componentType:string, id:number): Promise<KeyValueData[]> {
        if (componentType === "sps-overview-wellStatus") {
            if (id < 300) {
                return Promise.resolve(SPS_OverView_WellStatus_DATA);
            }
            else {
                return Promise.resolve(SPS_LossGain_Production_DATA);
            }
        }
        else {
            return Promise.resolve(SPS_LossGain_Production_DATA);
        }
    }
}