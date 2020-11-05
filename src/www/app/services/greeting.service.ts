// ---------------- libraries ---------------
import { Injectable } from '@angular/core';
import moment from 'moment';
// ---------------- libraries ---------------

enum Greetings {
    GoodMorging = 'Buongiorno',
    GoodAfternoon = 'Buon pomeriggio',
    GoodEvening = 'Buona sera'
}

@Injectable()
export class GreetingService {

    constructor() {

    }

    public get(): string {

        const m = moment();
        let g = null;
        
        let split_afternoon = 12
        let split_evening = 17
        let currentHour = parseFloat(m.format("HH"));
        
        if(currentHour >= split_afternoon && currentHour <= split_evening) {
            g = Greetings.GoodAfternoon;
        } else if(currentHour >= split_evening) {
            g = Greetings.GoodEvening;
        } else {
            g = Greetings.GoodMorging;
        }
        
        return g;

    }
    
}