import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentService } from 'src/app/shared/service/student.service';
@Component({
  selector: 'app-courses-information',
  templateUrl: './courses-information.component.html',
  styleUrls: ['./courses-information.component.css']
})
export class CoursesInformationComponent {
  selectedCourses:any[];
  loading: boolean = false;

  constructor(private http: HttpClient, private studentService: StudentService,){
    this.selectedCourses =[];
    this.fetchCourses()
  }
  selectCourses(){
    for(let i =0;i<15;i++){
      this.selectedCourses[i] = {"id": i}
    }
  }
  fetchCourses(): void {
    this.loading = true;
    this.studentService.getCourses().subscribe({
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

}
