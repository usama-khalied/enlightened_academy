import { Component } from '@angular/core';
import { CourseService } from 'src/app/shared/service/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  selectedCourses: any[];
  loading: boolean = false;

  constructor(private router: Router, private courseService: CourseService,) {
    this.selectedCourses = [];
    this.fetchCourses()
  }
  selectCourses() {
    for (let i = 0; i < 15; i++) {
      this.selectedCourses[i] = { "id": i }
    }
  }
  fetchCourses(): void {
    this.loading = true;
    this.courseService.getCourses().subscribe({
      next: (response) => {
        this.loading = false;
        this.selectedCourses = response.data.map((course: any) => ({
          ...course,
          checked: false,
        }));
      },
      error: (error) => console.error('Failed to fetch courses:', error),
    });
  }
  // ontrr(): void {
  //   this.router.navigate(['courses/detail']);
  // }
}
