import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { AddComponentComponent } from './views/task-component/add-component/add-component.component';

@Component({
  selector: 'app-root',
  template:`<router-outlet> </router-outlet>
  <ngx-spinner bdColor = "rgba(23,65,104,0.29)" size = "medium" color = "#174168" type = "line-spin-fade-rotating" [fullScreen] = "true"><p style="color: #d5caba;font-size: 18px;" > Loading... </p></ngx-spinner>`,
})
export class AppComponent implements OnInit, AfterViewInit {
  check:boolean =false;

  //Khai bao component va sử dụng các biến ở trong nó
  @ViewChild(AddComponentComponent) modal! : AddComponentComponent

  ngAfterViewInit(): void {
    // this.modal.showModal();
  }

  constructor(private _auth:AuthService){}
  
  ngOnInit(): void {
   this.setCurrenUser()
  }
  test =() => this.check =!this.check


   setCurrenUser(){
    let auth =JSON.parse(localStorage.getItem('user_info') as string) 
    if(auth)
      this._auth.setUserToken(auth);
  }

  login = () => this._auth.signWithGoogle();

  
}
