import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RequestType } from 'src/app/core/models/student/request-type';
import { UserToken } from 'src/app/core/models/student/student';
import { StudentTask } from 'src/app/core/models/student/student-task';
import { AuthService } from 'src/app/core/services/auth.service';
import { RequestTypeService } from 'src/app/core/services/request-type.service';
import { StudentTaskService } from 'src/app/core/services/student-task.service';
import { SweetalertService } from 'src/app/core/services/system/sweetalert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  student: UserToken = new UserToken();
  stuentTasks: StudentTask[] = [];
  urlFile: string = environment.urlFile;
  constructor(private _auth: AuthService,
    private _studentTask: StudentTaskService,
    private _alert: SweetalertService
  ) {
    this._auth.currenUser.pipe().subscribe(res => {
      this.student = res;
    })
  }

  ngOnInit() {
    this.getStudentTask();
  }

  getStudentTask() {
    this._studentTask.getAllTaskById(this.student.id).subscribe(res => {
      this.stuentTasks = res;
    })
  }

  load(check: boolean) {
    if (check) {
      this.getStudentTask();
    }
  }

  removeItem(key: number) {
    console.log(key)

    this._alert.confirm("Cảnh Báo", "Bạn có muốn xoá dữ liệu", () => {
      this._studentTask.deleteStudetTask(key).subscribe(res => {
        if (res.success) {
          this._alert.successMin("Xoá thành công ");
        }
        else {
          this._alert.warning(res.message);
        }
        this.load(true)
      }, error => {
        this._alert.error("Lỗi hệ thống")
      })
    })

  }

  loadCss(status: number) {

    let result = '';
    switch (status) {
      case 1:
        result = 'send';
        break;
      case 2:
        result = 'doing';
        break;
      case 3:
        result = 'success';
        break;
      default:
        result = 'disbaled';
        break;
    }
    return result;
  }

}
