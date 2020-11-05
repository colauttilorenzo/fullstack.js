// ---------------- libraries ---------------
import { Injectable } from '@angular/core';
// ---------------- libraries ---------------

import { Configuration } from '@models/configuration';


@Injectable()
export abstract class ServiceBase {

    public readonly ENVIRONMENT: Configuration = require('@app/../environments/environment').environment;

    constructor() {

    }
    

}