// ---------------- libraries ---------------
import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
// ---------------- libraries ---------------

import { AuthenticationToken } from '@models/authentication-token';
import { AuthenticationService } from '@services/authentication.service';
import { NavigateService } from '@app/services/navigate.service';


@Injectable()
export class AuthenticationGuard implements CanActivate, OnDestroy {

    constructor(private auth: AuthenticationService, private nav: NavigateService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        /*const current_token: AuthenticationToken|null = this.auth.get;
        const isauth: boolean = (current_token?.id ? true : false);
        if (!isauth) {
            // not logged in so redirect to login page with the return url
            this.nav.locationWithRedirect('/authorization/signin');
        }

        return isauth;*/

        return new Promise((resolve, reject) => {
            this.auth.data.subscribe((data: AuthenticationToken | null) => {
                if (data?.id) {
                    resolve(true);
                } else {
                    this.nav.locationWithRedirect('/authorization/signin');
                    resolve(false);
                }
            });
        });

    }

    ngOnDestroy(): void {
        
    }

}