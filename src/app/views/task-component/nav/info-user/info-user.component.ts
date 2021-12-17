import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UserToken } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {
  @ViewChild('modalInfo', { static: false }) modalInfo!: ModalDirective;
  @Input() userInfo  :UserToken = new UserToken()
  constructor(private _auth:AuthService) { }

  ngOnInit() {
  }
  
  showModal = () => this.modalInfo.show();

  logout() {
    this._auth.sigOut()
  }
}
