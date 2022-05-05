import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Department } from 'src/app/core/models/department/depart';
import { UserToken } from 'src/app/core/models/student/student';
import { AuthService } from 'src/app/core/services/auth.service';
import { DepartmentService } from 'src/app/core/services/department.service';
import { SweetalertService } from 'src/app/core/services/system/sweetalert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mssv: string = '';
  departments: Department[] = [];

  private alert_student_notFound!: string;
  private alert_reload_page!: string;

  title_studentId!: string;
  constructor(private _auth: AuthService,
    private readonly _departService: DepartmentService,
    private readonly _router: Router,
    private readonly _sweetAlert: SweetalertService,
    private _transalte: TranslateService) { 
    
    }

  ngOnInit() {
    this.getAllDepart();
    const check  =this._auth.isLoggeed();
    if( check){
      this._router.navigateByUrl("/");
    }
  }

  login() {
    const data = {
      mssv: this.mssv,
    }
    localStorage.setItem('data', JSON.stringify(data));
    this._auth.signWithGoogle().then(res => {
      if (res) {
        setTimeout(() => {
          this._router.navigateByUrl("/");
        }, 200);
      } else {
        this._sweetAlert.error(this._transalte.instant('alert.student_notfound'),  this._transalte.instant('alert.reload_page'));
        setTimeout(() => {
          this._auth.sigOut();
        }, 3000);
        return;
      }
    })
  }

  

  getAllDepart() {
    this._departService.getAll().subscribe(res => {
      this.departments = res;
    })
  }

}
