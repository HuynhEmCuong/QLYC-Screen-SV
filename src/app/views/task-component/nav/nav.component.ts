import { Component, OnInit, ViewChild } from '@angular/core';
import { UserToken } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  userToken: UserToken = new UserToken()
  constructor(private _auth: AuthService) { }


  ngOnInit() {
    this._auth.currenUser.pipe().subscribe(res => {
      this.userToken = res
    })
  }

  checkUserExit(email: string) {

  }

}
