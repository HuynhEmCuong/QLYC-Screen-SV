import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { interval, skip, take } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestType } from 'src/app/core/models/student/request-type';
import { UserToken } from 'src/app/core/models/student/student';
import { StudentTask } from 'src/app/core/models/student/student-task';
import { AuthService } from 'src/app/core/services/auth.service';
import { RequestTypeService } from 'src/app/core/services/request-type.service';
import { StudentTaskService } from 'src/app/core/services/student-task.service';
import { FileService } from 'src/app/core/services/system/file.service';
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
  requestTypeId: string = "";
  requestTypeNote: string = "";

  constructor(private _requestType: RequestTypeService,
    private readonly _file: FileService,
    private readonly _studentTask: StudentTaskService,
    private readonly _alert: SweetalertService,
    private readonly _spiner: NgxSpinnerService,
    private readonly _translate:TranslateService
  ) {

  }

  ngOnInit() {
    this.getRequestTypes();
    this.getQuantity();
  }

  //Init Quantity
  getQuantity() {
    interval(10).pipe(skip(1), take(10)).subscribe(res => {
      let quantity: Quantity = new Quantity(res, res)
      this.quantities.push(quantity);
    })
  }

  //Get lits RequestType from DB
  getRequestTypes() {
    this._requestType.getAll().subscribe(res => {
      this.requestTypes = res;
    })
  }

  //Get Note for RequestType
  getNoteRequestType(requestId: string | number): void {
    this.requestTypeNote = this.requestTypes.find(x => x.id == requestId)?.note ?? "";
  }


  //Submit
  async save(addForm: any) {
    debugger

    this.studentTask.studentId = this.student.id;
    this.studentTask.requestId = +this.requestTypeId;
    if (this.studentTask.requestId == 13 && !this.studentTask.fileNameStudent) {
      this._alert.warning("File không được để trống");
      return;
    }
    this._spiner.show();
    const result = await this._studentTask.addTask(this.studentTask)
    if (result.success) {
      this._spiner.hide();
      this._alert.successMin(result.message);
      this.clearForm();
      this.hideModal();
      this.checkLoad.emit(true)
    } else {
      this._alert.error(this._translate.instant('alert.system_error'))
    }
  }

  //SelectFile
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 10485760) {
        this._alert.warning(this._translate.instant('alert.file_upload'));
        return;
      }
      const fileNameExtension = file.name.split('.').pop();
      if (fileNameExtension.toLowerCase() !== 'pdf') {
        this._alert.warning(this._translate.instant('alert.file_pdf'));
        return;
      }
      this._spiner.show();
      const formData = new FormData();
      let nameFile = this.student.fullName + "-" + this.requestTypeId;
      formData.append('file', file);
      this._file.uploadFile(formData, nameFile).
        pipe(
          tap(() => { this._spiner.hide(); })
        ).subscribe(res => {
          if (res) {

            this.studentTask.fileNameStudent = res.fileResponse.fileLocalName;
            this.studentTask.filePathStudent = res.fileResponse.fileFullPath;
          } else {
            this._alert.warning(this._translate.instant('alert.system_error'))
          }
        })
    }
  }

  removeFile() {
    this._alert.confirm(this._translate.instant('common.delete'), this._translate.instant('alert.delete_data'), () => {
      this._file.removeFile(this.studentTask.filePathStudent ?? "").subscribe(res => {
        if (res) {
          this._alert.successMin(this._translate.instant('alert.delete_success'));
          this.studentTask.fileNameStudent = "";
          this.studentTask.filePathStudent = "";
        } else {
          this._alert.warning(this._translate.instant('alert.system_error'))
        }
      })
    });
  }

  private clearForm() {
    this.studentTask = new StudentTask();
    this.requestTypeId = "";
    this.requestTypeNote = ""
  }


  showModal = () => this.modalAdd.show();
  hideModal = () => this.modalAdd.hide();
}

export class Quantity {
  id: number = 0;
  value: number = 0;
  constructor(id: number, value: number) {
    this.id = id;
    this.value = value;
  }
}
