import { Injectable } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ReplaySubject } from 'rxjs';
import { UserToken } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currenUser = new ReplaySubject<UserToken>(1);
  jwtHelper = new JwtHelperService();
  constructor(private _serviceAuth: SocialAuthService,
    private _router: Router) { }

  signWithGoogle() {
    this._serviceAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      let data = JSON.stringify(res)
      this.setCurrentUser(data);
      this._router.navigateByUrl("/")
    }, error =>{
      if (error) alert('please allow popup for this app')
    })
  }

  setCurrentUser(value: string) {
    const data = JSON.parse(value)
    let mssv = localStorage.getItem('mssv') || "" 
    const user  = new UserToken();
    user.mssv = mssv;
    user.email = data?.email;
    user.userName = data?.userName;
    user.idToken = data?.idToken
    user.urlImage = data?.photoUrl
    user.getFullName(data?.firstName, data?.lastName)

    localStorage.removeItem('mssv');
    localStorage.setItem('user_info', JSON.stringify(user))
    this.currenUser.next(user)
  }

  isLoggeed() {
    let auth = localStorage.getItem('user_info') as string
    if (auth) {
      let data = JSON.parse(auth) as UserToken;
      this.currenUser.next(data);
      return true
    }
    else return false
  }

  sigOut() {
    localStorage.removeItem('user_info')
    this._serviceAuth.signOut();
    this._router.navigateByUrl("/login")
  }


  checkUserExist(){
    return false;
  }
}



