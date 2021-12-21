import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class CheckUserResolver implements Resolve<boolean> {
    constructor(private _auth:AuthService){}
    resolve(route: ActivatedRouteSnapshot):  boolean {
       return this._auth.checkUserExist();
    }
}