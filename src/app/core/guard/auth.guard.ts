import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserToken } from '../models/student/user';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    private _user: UserToken | null = null;
    constructor(private _auth: AuthService,
        private _router: Router) {
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