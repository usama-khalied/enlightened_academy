import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesComponent } from './courses.component';
import { ViewCourseComponent } from './view-course/view-course.component';

@NgModule({
  declarations: [CoursesComponent,ViewCourseComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoursesModule { }
