import {Injectable} from '@angular/core';
import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';

const key_app_configItems: string = "koc_app_configItems";
const key_sps_configItems: string = "koc_app_sps_configItems";


@Injectable()
export class GlobalDataService {
    
    constructor(private localStorageService: LocalStorageService) {
        
    }

    getAppConfigItems() {
        if (this.localStorageService.keys().indexOf(key_app_configItems) > -1) {
            return this.localStorageService.get(key_app_configItems);
        }
        else {
            //throw new Error("localStorageService key" + key_app_configItems + " not found");
            return null;
        }
    }

    setAppConfigItems(configItems: {}) {
        this.localStorageService.set(key_app_configItems, configItems);
    }

    getModuleConfigItems() {
        if (this.localStorageService.keys().indexOf(key_sps_configItems) > -1) {
            return this.localStorageService.get(key_sps_configItems);
        }
        else {
            throw new Error("localStorageService key" + key_sps_configItems + " not found");
        }
    }

    setModuleConfigItems(configItems: {}) {
        this.localStorageService.set(key_sps_configItems, configItems);
    }
}
