﻿/**
 * @filename configdata.service.ts
 * 
 * The common configuration service. This will read the JSON file and return the JSON object wherever it needed.
 * The public property "configJsonPath" is declared. The Caller needs to set the JSON relative path to this property.
 *The service read this property and loads the JSON file and return as the object.
 *
 * @author Sudhakar S I
 * @version 0.0 date: 09/27/2016
 * @version 0.1 date: 
 * @since 09/26/2016
 * @see 
 *
 * Copyright HALLIBURTON – All rights reserved
 */

import {Injectable} from '@angular/core';
import {HttpModule, Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx'; 
import { Logger } from "angular2-logger/core";

import { HelperService } from './helper.service';
import { KOC_APP_Config_Items } from '../../config/app.config';
import { SPS_Config_Items } from '../../sps/config/sps.config';

@Injectable()
export class ConfigDataService { 
    public configJsonPath: string;
    constructor(private _logger: Logger, private http: Http, public _helperService: HelperService) {
        
    }

    /**
    * Use Observable module to read JSON file and return data.
    * Uses Observable.forkJoin() to run multiple concurrent http.get() requests.
    * The entire operation will result in an error state if any single request fails.
    *
    * Use like below
                ConfigDataService.getConfigItems().subscribe(
                        //Response
                        (items:any) => {
                            this.appConfigItems = items[0]
                        },
                        //Error
                        (err:any) => {
                            this._logger.error(err);
                        },
                        //Success
                        () => {
                            this._logger.log(' LeftNavMenuComponent getConfigItems - done');
                            this.initComponent();
                        }
                    );
    *
    * @return Json object
    * 
    * @throws error message (Using HelperService handleError)
    */
    getConfigItemsFromJsonFile() {
        return Observable.forkJoin(
            this.http.get(this.configJsonPath)
                .map((res: Response) => res.json())
                .catch(this._helperService.handleError)
        );
    }

    getConfigItemsFromJsonPath(configJSONPath:string) {
        return Observable.forkJoin(
            this.http.get(configJSONPath)
                .map((res: Response) => res.json())
                .catch(this._helperService.handleError)
        );
    }

    getAppConfigItems() {
        return KOC_APP_Config_Items;
    }

    getModuleConfigItems(moduleName: string) {
        if (moduleName == "sps") {
            return SPS_Config_Items;
        }
    }
   
}