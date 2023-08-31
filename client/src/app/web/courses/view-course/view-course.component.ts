import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/model/Course';
import { CourseService } from 'src/app/shared/service/course.service';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit {
  id: string | number = -1;
  loading: boolean = false;
  courseList:Course[] = [];

  constructor(private route :ActivatedRoute,private courseService: CourseService){
    
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getCourse();
  }
  getCourse():void {
    this.courseService.getCourse(this.id).subscribe({
      next: (response) => {
        this.loading = false;
        this.courseList.push(response.data as unknown as Course)
      },
      error: (error) => console.error('Failed to fetch courses:', error),
    });
  }
}
