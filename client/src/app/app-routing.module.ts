import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { CoursesInformationComponent } from './courses-information/courses-information.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

{
  path: 'courses',
  component: CoursesInformationComponent
},
{
  path: 'register',
  component: RegisterPageComponent
},
{
  path: '',
  component: HomeComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
