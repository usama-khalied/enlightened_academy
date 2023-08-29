import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { ViewCourseComponent } from './view-course/view-course.component';

const routes: Routes = [
  {
    path: '', component: CoursesComponent,
    children: []
  },
  { path: 'detail/:id', component: ViewCourseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
