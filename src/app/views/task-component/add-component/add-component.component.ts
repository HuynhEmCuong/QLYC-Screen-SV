import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { interval, take } from 'rxjs';
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
  @Output() checkLoad = new EventEmitter();
  @Input() student: UserToken = new UserToken()
  requestTypes: RequestType[] = [];
  studentTask: StudentTask = new StudentTask()
  quantities: Quantity[] = []


  constructor(private _requestType: RequestTypeService,

    private _studentTask: StudentTaskService,
    private _alert: SweetalertService
  ) {

  }

  ngOnInit() {
    this.getRequestType();
    this.getQuantity() ;
  }
  getQuantity() {
    interval(10).pipe(take(11)).subscribe(res => {
      let quantity:Quantity  =new Quantity(res,res)
      this.quantities.push(quantity);
    })
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
      this.studentTask = new StudentTask()
      this.hideModal();
      this.checkLoad.emit(true)
    } else {
      this._alert.error("Lỗi hệ thống")
    }
  }


  showModal = () => this.modalAdd.show();
  hideModal = () => this.modalAdd.hide();
}

export class Quantity {
  id: number = 0;
  value: number = 0;
  constructor(id:number , value:number){
    this.id = id;
    this.value = value;
  }
}
