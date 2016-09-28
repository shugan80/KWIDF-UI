/**
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

@Injectable()
export class HelperService { 
    
    constructor(private http: Http) {
    }

    public handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
   
}