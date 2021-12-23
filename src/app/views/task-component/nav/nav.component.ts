import { Component, OnInit, ViewChild } from '@angular/core';
import { UserToken } from 'src/app/core/models/student/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { StudentService } from 'src/app/core/services/student.service';
import { InfoUserComponent } from './info-user/info-user.component';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @ViewChild(InfoUserComponent) userModal!: InfoUserComponent

  userToken: UserToken = new UserToken()
  listUser: UserToken[] = [];
  constructor(
    private _auth: AuthService,
    private _studenService: StudentService) { }

  ngOnInit() {
    this._auth.currenUser.pipe().subscribe(res => {
      this.userToken = res;
    })
  }


  test() {
    this._studenService.getAll().subscribe(res => {
      this.listUser = res;
    })
  }
}
