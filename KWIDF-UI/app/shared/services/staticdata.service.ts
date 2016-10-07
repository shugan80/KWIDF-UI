import { Injectable } from '@angular/core';
import { KeyValueData } from '../model/key-value';
import { KeyValueObject } from '../model/key-value';
import { SPS_OverView_WellEvents_DATA } from '../data/mock-data-sps-overview';
import { SPS_OverView_WellStatus_DATA } from '../data/mock-data-sps-overview';
import { SPS_LossGain_Production_DATA } from '../data/mock-data-sps-overview';



@Injectable()
export class StaticDataService {
    
    get_columnChart_Data(componentType: string, id: number): Promise<KeyValueObject[]> {
        if (componentType === "sps-overview-wellEvents") {
            let resultData = SPS_OverView_WellEvents_DATA.filter(data => data.id == id);
            return Promise.resolve(resultData);
        }
        else {
            let resultData = SPS_OverView_WellEvents_DATA.filter(data => data.id == id);
            return Promise.resolve(resultData);
        }
    }

    get_pieChart_Data(componentType: string, id: number): Promise<KeyValueObject[]> {
        if (componentType === "sps-overview-wellStatus") {
            let resultData = SPS_OverView_WellStatus_DATA.filter(data => data.id == id);
            return Promise.resolve(resultData);
        }
        else {
            let resultData = SPS_LossGain_Production_DATA.filter(data => data.id == id);
            return Promise.resolve(resultData);
        }
    }

}