import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit,AfterViewInit {

  constructor(private _auth : AuthService) { }
  ngAfterViewInit(): void {
  }

  ngOnInit() {
   
  }

  login =() => this._auth.signWithGoogle()
  

}
