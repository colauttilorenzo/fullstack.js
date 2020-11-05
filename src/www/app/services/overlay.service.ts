// ---------------- libraries ---------------
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// ---------------- libraries ---------------


@Injectable()
export class OverlayService {

    private _isactive: BehaviorSubject<boolean>;
    public isactive: Observable<boolean>;

    private _exitdelegate: BehaviorSubject<Function>;
    public exitdelegate: Observable<Function>;

    constructor() {
        this._isactive = new BehaviorSubject<boolean>(false);
        this.isactive = this._isactive.asObservable();

        this._exitdelegate = new BehaviorSubject<Function>(() => { });
        this.exitdelegate = this._exitdelegate.asObservable();
    }

    public set set(value: boolean) {
        this._isactive.next(value);
    }

    public set setExitDelegate(value: Function) {
        this._exitdelegate.next(value);
    }

}