// ---------------- libraries ---------------
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
// ---------------- libraries ---------------

import { ServiceBase } from './base/service-base';

@Injectable()
export class NavigateService extends ServiceBase {

    constructor(private route: ActivatedRoute, private router: Router) {
        super();
        
    }

    public location(path: string, ...args: Array<string>): void {
        this.router.navigate([path].concat(args));
    }

    public go(path: string, data: any = {}): void {
        this.router.navigate([path], data);
    }

    public getLocationCallback(): string {
        return this.route.snapshot.queryParams['redirect'] || this.route.snapshot.url;
    }

    public locationWithRedirect(path: string): void {
        this.go(path, { queryParams: { redirect: window.location.pathname }});
    }

}