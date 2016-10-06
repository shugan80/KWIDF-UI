import { KeyValueData } from '../model/key-value';

export const SPS_OverView_WellEvents_DATA: KeyValueData[] = [
    { "key": "Trips", "value": 10, "properties": {} },
    { "key": "Build-Ups", "value": 15, "properties": {} },
    { "key": "Pump Issues", "value": 5, "properties": {} },
    { "key": "Workovers", "value": 7, "properties": {} }
]

export const SPS_OverView_WellStatus_DATA: KeyValueData[] = [
    { "key": "Producing", "value": 17, "properties": { "color": "green" } },
    { "key": "Shut-In", "value": 6, "properties": { "color": "red" } },
    { "key": "Workover", "value": 1, "properties": { "color": "grey" } },
    { "key": "Equipment Issue", "value": 3, "properties": { "color": "purple" } }
]

export const SPS_LossGain_Production_DATA: KeyValueData[] = [
    { "key": "Producing", "value": 67, "properties": { "color": "green" } },
    { "key": "Shut-In", "value": 74, "properties": { "color": "red" } },
    { "key": "Workover", "value": 23, "properties": { "color": "grey" } },
    { "key": "Equipment Issue", "value": 5, "properties": { "color": "purple" } }
]