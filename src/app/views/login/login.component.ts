import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/core/models/department/depart';
import { UserToken } from 'src/app/core/models/student/student';
import { AuthService } from 'src/app/core/services/auth.service';
import { DepartmentService } from 'src/app/core/services/department.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mssv:string ='';
  dept:string ='';
  departments: Department[] = [];
  constructor(private _auth:AuthService,
    private readonly _departService: DepartmentService,) { }

  ngOnInit() {
    this.getAllDepart();
  }

  login (){
    const data = {
      mssv:this.mssv,
      dept : +this.dept
    }
    localStorage.setItem('data',JSON.stringify(data));
    this._auth.signWithGoogle()
  } 

  getAllDepart() {
    this._departService.getAll().subscribe(res => {
      this.departments = res;
    })
  }

}
