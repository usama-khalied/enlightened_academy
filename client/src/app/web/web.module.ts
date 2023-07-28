import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { WebRoutingModule } from './web-routing.module';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { NavbarComponent } from './nav-bar/nav-bar.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { StudentdataformComponent } from './studentdataform/studentdataform.component';
import { CoursesInformationComponent } from './courses-information/courses-information.component';
import { AvaialableCoursesComponent } from './avaialable-courses/avaialable-courses.component';
import { HomeComponent } from './home/home.component';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import * as successDialogComponent from '../shared/success-dialog/success-dialog.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { CeoMessageComponent } from './home/ceo-message/ceo-message.component';
import { WebComponent } from './web.component';
import { MaterialModule } from '../shared/material/material.module';
import { LoaderComponent } from '../shared/loader/loader.component';

@NgModule({
  declarations: [
    NavbarComponent,
    CoursesPageComponent,
    RegisterPageComponent,
    StudentdataformComponent,
    CoursesInformationComponent,
    AvaialableCoursesComponent,
    HomeComponent,
    ErrorDialogComponent,
    LoaderComponent,
    successDialogComponent.SuccessDialogComponent,
    SidenavComponent,
    FooterComponent,
    CeoMessageComponent,
    WebComponent,
  ],

  imports: [
    CommonModule,
    WebRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MdbCarouselModule,
    SocialLoginModule,
  ],
 
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '236025958894-l05tha7iovc0ool81upch4i6gi91npe8.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WebModule {}
