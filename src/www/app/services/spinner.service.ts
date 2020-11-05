// ---------------- libraries ---------------
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// ---------------- libraries ---------------


@Injectable()
export class SpinnerService {

    private _isactive: BehaviorSubject<boolean>;
    public isactive: Observable<boolean>;

    constructor() {
        this._isactive = new BehaviorSubject<boolean>(false);
        this.isactive = this._isactive.asObservable();
    }

    public set set(value: boolean) {
        this._isactive.next(value);
    }

    public show(): void {
        this._isactive.next(true);
    }

    public hide(): void {
        this._isactive.next(false);
    }
    
}