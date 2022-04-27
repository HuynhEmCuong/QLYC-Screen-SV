import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private _auth: AuthService,
    private readonly _departService: DepartmentService,
    private readonly _router: Router,
    private readonly _sweetAlert: SweetalertService) { }

  ngOnInit() {
    this.getAllDepart();
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
        this._sweetAlert.error("Mã số sinh viên không tìm thấy", "Trang tự reload sau 2 giây");
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
