import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs';
import { UserToken } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    private _user: UserToken | null = null;
    constructor(private _auth: AuthService,
        private _router: Router) {
        this._auth.currenUser.pipe(take(1)).subscribe((res: UserToken) => {
            this._user = res;
        })
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if ( this._auth.isLoggeed() ==true ) {
            return true;
        }
        else {
            this._router.navigateByUrl("/login")
            return false
        }
    }
}