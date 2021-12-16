import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _serviceAuth: SocialAuthService) { }

  signWithGoogle (){
    debugger
    this._serviceAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(res =>{
      debugger
      let data = JSON.stringify(res)
      let test = JSON.parse(data);
      console.log(test)
    })
  } 
}



