import { Component, OnInit } from '@angular/core';
import { UserToken } from 'src/app/core/models/student/student';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mssv:string ='';
  constructor(private _auth:AuthService) { }

  ngOnInit() {
    
  }

  login (){
    localStorage.setItem('mssv',this.mssv);
    this._auth.signWithGoogle()
  } 

}
