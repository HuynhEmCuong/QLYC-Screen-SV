import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { firstValueFrom, lastValueFrom, map, ReplaySubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OperationResult } from '../models/general/operation-result';
import { StudentViewModel, UserToken } from '../models/student/user';



const API = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currenUser = new ReplaySubject<UserToken>(1);
  jwtHelper = new JwtHelperService();
  constructor(private _serviceAuth: SocialAuthService,
    private _router: Router,
    private _http: HttpClient) { }

  signWithGoogle() {
    this._serviceAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(async res => {
      let data = JSON.stringify(res)
      await this.setCurrentUser(data);
      this._router.navigateByUrl("/");
    }, error => {
      if (error) alert('please allow popup for this app')
    })
  }

  async setCurrentUser(value: string) {
 
    const data = JSON.parse(value)
    let mssv = localStorage.getItem('mssv') || ""
    const user = new UserToken();
    user.studentIdNew = mssv;
    user.studentId = mssv;
    user.email = data?.email;
    user.userName = data?.userName;
    user.idToken = data?.idToken
    user.urlImage = data?.photoUrl
    user.getFullName(data?.firstName, data?.lastName)
    
    const test = await this.checkStudentExsit(user);
    this.currenUser.next(user)
    localStorage.setItem('user_info', JSON.stringify(user))
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


  async checkStudentExsit(model: UserToken) {
    const data$ = this._http.post<OperationResult>(`${API}/Student/CheckUserExist`, model)
    return await firstValueFrom(data$)
  }



  checkUserExist() {

    return false;
  }
}



