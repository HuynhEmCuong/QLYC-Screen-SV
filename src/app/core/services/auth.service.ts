import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { firstValueFrom, lastValueFrom, map, ReplaySubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OperationResult } from '../models/general/operation-result';
import { LoginStudentDto, StudentViewModel, UserToken } from '../models/student/student';



const API = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: UserToken = new UserToken();
  currenUser = new ReplaySubject<UserToken>(1);
  jwtHelper = new JwtHelperService();
  constructor(private _serviceAuth: SocialAuthService,
    private _http: HttpClient) { }

  signWithGoogle(): Promise<boolean> {
    const method = this._serviceAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(async res => {
      let check = await this.setCurrentUser(res);
      return check;
    }, error => {
      if (error) alert('Lỗi hệ thống ')
      return false
    })
    return method;
  }

  async setCurrentUser(value: any) {
    const data = JSON.parse(JSON.stringify(value))
    let dataLocalStore = JSON.parse(localStorage.getItem('data') || " ");

    //Get Dtops
    let model: LoginStudentDto = new LoginStudentDto(data.email, dataLocalStore.mssv);

    //Check user exsit and get info studentId vs Mobi
    const result = await this.checkStudentExsit(model);
    if (result.success) {
      let user: UserToken = result.data;
      user.studentIdNew = dataLocalStore.mssv;
      user.idToken = data?.idToken;
      user.urlImage = data?.photoUrl;

      //Set current user and localstore
      this.setUserToken(user)
      return true;
    } else {
      return false;
    }

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
    window.location.reload()
  }


  async checkStudentExsit(model: LoginStudentDto) {
    const data$ = this._http.post<OperationResult>(`${API}/Student/CheckUserExist`, model)
    return await firstValueFrom(data$)
  }

  checkUserExist() {

    return false;
  }
}



