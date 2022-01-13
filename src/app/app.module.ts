import { ElementRef, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppComponent } from './app.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronCircleRight, faEnvelope, faPlusSquare, faTrashAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ModalModule } from 'ngx-bootstrap/modal';

import {
  GoogleLoginProvider,
} from 'angularx-social-login';
import { AddComponentComponent } from './views/task-component/add-component/add-component.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './views/login/login.component';
import { FooterComponentComponent } from './views/task-component/footer-component/footer-component.component';
import { NavComponent } from './views/task-component/nav/nav.component';
import { MainComponent } from './views/task-component/main/main.component';
import { CommonModule } from '@angular/common';
import { InfoUserComponent } from './views/task-component/nav/info-user/info-user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskStatusPipe } from './core/pipe/task-status.pipe';
import { SharedModule } from './core/shared/shared.module';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddComponentComponent,
    FooterComponentComponent,
    NavComponent,
    MainComponent,
    InfoUserComponent,
    

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    TooltipModule.forRoot(),
    FontAwesomeModule,
    ModalModule.forRoot(),
    SocialLoginModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue:{
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.keyGG
            )
          },
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faEnvelope, faTrashAlt, faPlusSquare,faUserCircle,faChevronCircleRight);
  }

}
