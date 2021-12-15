import { ElementRef, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppComponent } from './app.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faEnvelope, faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AddComponentComponent } from './add-component/add-component.component';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [	
    AppComponent,
      AddComponentComponent,
      AddComponentComponent
   ],
  imports: [
    BrowserModule,
    TooltipModule.forRoot(),
    FontAwesomeModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  @ViewChild('modalAdd', { read: ElementRef })
  modleAdd!: ElementRef;

  constructor(private library: FaIconLibrary) {
    library.addIcons(faEnvelope,faTrashAlt ,faPlusSquare);
  }

  opens(){
    
  }

  
 }
