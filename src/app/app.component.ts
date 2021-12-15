import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AddComponentComponent } from './add-component/add-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  check:boolean =false;

  //Khai bao component va sử dụng các biến ở trong nó
  @ViewChild(AddComponentComponent) modal! : AddComponentComponent

  ngAfterViewInit(): void {
    // this.modal.showModal();
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  test =() => this.check =!this.check

  
}
