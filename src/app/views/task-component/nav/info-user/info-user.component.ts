import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { map, tap } from 'rxjs';
import { OperationResult } from 'src/app/core/models/general/operation-result';
import { UserToken } from 'src/app/core/models/student/student';
import { AuthService } from 'src/app/core/services/auth.service';
import { StudentService } from 'src/app/core/services/student.service';
import { SweetalertService } from 'src/app/core/services/system/sweetalert.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit, AfterViewInit {
  @ViewChild('modalInfo', { static: false }) modalInfo!: ModalDirective;
  @Input() userInfo: UserToken = new UserToken()
  @Output() user = new EventEmitter<UserToken>();

  mobiPattern = '[- +()0-9]+';
  constructor(private _auth: AuthService,
    private _route: ActivatedRoute,
    private _studentService: StudentService,
    private _alert: SweetalertService) { }



  ngAfterViewInit(): void {
    let studentId = this.userInfo.studentId;
    let studentIdNew = this.userInfo.studentIdNew;
    let mobi = this.userInfo.mobi;
    if (studentId != studentIdNew) {
      this._alert.confirm("Cảnh báo", `Mã số sinh viên của bạn
      ${studentId} đã bị thay đổi thành ${studentIdNew}. Bạn có muốn thay đổi không ?`, () => {
        this.userInfo.studentId = studentIdNew;
        this.update();
      })
    }
    if(!mobi){
      this._alert.confirm("Cảnh báo", `Bạn chưa cập nhật số điện thoại. Bạn có muốn cập nhật  không ?`, () => {
        this.showModal()
      })
    }
    
  }

  ngOnInit() {

  }

  update() {
    this._studentService.updateInfo(this.userInfo).pipe(
      tap(res => { 
        this._auth.currenUser.next(res.data);
      })
    ).subscribe(res => {
      if (res.success) {
        this.userInfo.studentId = res.data.studentId;
        this.userInfo.mobi = res.data.mobi;
        this._alert.successMin(res.message);
        this._auth.setUserToken(this.userInfo)
        this.hideModal();
      } else {
        this._alert.error("Lỗi server, vui lòng thử lại ")
      }
    })
  }



  showModal = () => this.modalInfo.show();
  hideModal = () => this.modalInfo.hide();
  logOut = () => this._auth.sigOut();


}
