import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { AddComponentComponent } from './views/task-component/add-component/add-component.component';

@Component({
  selector: 'app-root',
  template:`<router-outlet> </router-outlet>`,
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
     debugger
    let auth =JSON.parse(localStorage.getItem('user_info') as string) 
    if(auth)
      this._auth.setUserToken(auth);
  }

  login = () => this._auth.signWithGoogle();

  
}
