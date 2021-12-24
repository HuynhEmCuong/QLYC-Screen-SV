import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RequestType } from 'src/app/core/models/student/request-type';
import { AuthService } from 'src/app/core/services/auth.service';
import { RequestTypeService } from 'src/app/core/services/request-type.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor() { }

  ngOnInit() {

  }


 
}
