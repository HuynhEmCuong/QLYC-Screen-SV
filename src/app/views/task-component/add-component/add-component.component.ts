import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.scss']
})
export class AddComponentComponent implements OnInit {
  @ViewChild('lgModal', { static: false }) modalAdd!: ModalDirective;
  
  constructor() {}

  ngOnInit() {
    
  }

  showModal = () => this.modalAdd.show();

}
