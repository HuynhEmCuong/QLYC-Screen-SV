import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { map } from 'rxjs';
import { UserToken } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit, AfterViewInit {
  @ViewChild('modalInfo', { static: false }) modalInfo!: ModalDirective;
  @Input() userInfo: UserToken = new UserToken()
  check: boolean = true;


  constructor(private _auth: AuthService,
    private _route: ActivatedRoute) { }
    ngAfterViewInit(): void {
    console.log(this.check)
    if(this.check)
      this.showModal();

  }

  ngOnInit() {
    this._route.data.subscribe(res => {
      this.check = res['checkUser']
    })
  }


  showModal = () => this.modalInfo.show();

  logout() {
    this._auth.sigOut()
  }
}
