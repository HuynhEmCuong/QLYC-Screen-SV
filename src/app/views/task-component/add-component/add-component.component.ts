import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { RequestType } from 'src/app/core/models/student/request-type';
import { UserToken } from 'src/app/core/models/student/student';
import { StudentTask } from 'src/app/core/models/student/student-task';
import { AuthService } from 'src/app/core/services/auth.service';
import { RequestTypeService } from 'src/app/core/services/request-type.service';
import { StudentTaskService } from 'src/app/core/services/student-task.service';
import { SweetalertService } from 'src/app/core/services/system/sweetalert.service';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.scss']
})
export class AddComponentComponent implements OnInit {
  @ViewChild('lgModal', { static: false }) modalAdd!: ModalDirective;
  student: UserToken = new UserToken();
  requestTypes: RequestType[] = [];
  studentTask: StudentTask = new StudentTask()

  constructor(private _requestType: RequestTypeService,
    private _auth: AuthService,
    private _studentTask: StudentTaskService,
    private _alert: SweetalertService
  ) {
    this._auth.currenUser.pipe().subscribe(res => {
      this.student = res;
    })
  }

  ngOnInit() {
    this.getRequestType();
  }

  getRequestType() {
    this._requestType.getAll().subscribe(res => {
      this.requestTypes = res;
    })
  }

  async save() {
    this.studentTask.studentId = this.student.id;
    const result = await this._studentTask.addTask(this.studentTask)
    if (result.success) {
      this._alert.successMin(result.message);
      this.hideModal();
    } else {
      this._alert.error("Lỗi hệ thống")
    }
  }


  showModal = () => this.modalAdd.show();
  hideModal = () => this.modalAdd.hide();
}
