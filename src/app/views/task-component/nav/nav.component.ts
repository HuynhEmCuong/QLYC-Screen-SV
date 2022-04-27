import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserToken } from 'src/app/core/models/student/student';
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
  isLogin: boolean = false;
  userToken: UserToken = new UserToken()
  constructor(
    private _auth: AuthService,
    private _studenService: StudentService) {
    this._auth.currenUser.pipe().subscribe(res => {
      this.userToken = res;
      this.isLogin = this.userToken ? true : false;
    })
  }

  ngOnInit() {
  }
  update($value: any) {
    this.userToken = $value
  }

  switchLang(lang: string): void {
    
  }
}
