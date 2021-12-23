import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
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
  private _user: UserToken = new UserToken();
  currenUser = new ReplaySubject<UserToken>(1);
  jwtHelper = new JwtHelperService();
  constructor(private _serviceAuth: SocialAuthService,
    private _router: Router,
    private _http: HttpClient) { }

  signWithGoogle() {
    this._serviceAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(async res => {
      debugger
      await this.setCurrentUser(res);

      setTimeout(() => {
        this._router.navigateByUrl("/");
      }, 500);
    }, error => {
      if (error) alert('please allow popup for this app')
    })
  }

  async setCurrentUser(value: any) {
    const data = JSON.parse(JSON.stringify(value))
    let mssv = localStorage.getItem('mssv') || ""

    let user = new UserToken();

    user.studentId = mssv;
    user.email = data?.email;
    user.getFullName(data?.firstName, data?.lastName)

    //Check user exsit and get info studentId vs Mobi
    const result = await this.checkStudentExsit(user);
    user = result.data;
    user.studentIdNew = mssv;
    user.userName = data?.userName;
    user.idToken = data?.idToken
    user.urlImage = data?.photoUrl

    this.setUserToken(user)
    // this.currenUser.next(user)
    // this._user = user;
    // localStorage.setItem('user_info', JSON.stringify(user))
  }

  setUserToken(user: UserToken) {
    this.currenUser.next(user)
    this._user = user;
    localStorage.setItem('user_info', JSON.stringify(user))
  }

  isLoggeed() {
    if (this._user) {
      const token = this._user.idToken;
      return token != null && !this.jwtHelper.isTokenExpired(token);
    } else {
      return false
    }
  }

  sigOut() {
    localStorage.removeItem('user_info')
    localStorage.removeItem('mssv')
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



