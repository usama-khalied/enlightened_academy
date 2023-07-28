import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesInformationComponent } from './courses-information/courses-information.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomeComponent } from './home/home.component';
import { WebComponent } from './web.component';





const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // {
  //   path: 'courses',
  //   component: CoursesInformationComponent
  // },
  // {
  //   path: 'register',
  //   component: RegisterPageComponent
  // },
  // {
  //   path: 'home',
  //   component: HomeComponent
  // },
  {
    path: '',
    component: WebComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'courses', component: CoursesInformationComponent },
      { path: 'register', component: RegisterPageComponent },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class WebRoutingModule { }
