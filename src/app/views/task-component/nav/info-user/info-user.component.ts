import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { map } from 'rxjs';
import { UserToken } from 'src/app/core/models/student/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit, AfterViewInit {
  @ViewChild('modalInfo', { static: false }) modalInfo!: ModalDirective;
  @Input() userInfo: UserToken = new UserToken()


  constructor(private _auth: AuthService,
    private _route: ActivatedRoute,
    private _studentService: StudentService) { }


  ngAfterViewInit(): void {


  }

  ngOnInit() {

  }


  showModal = () => this.modalInfo.show();

  logout() {
    this._auth.sigOut()
  }
}
