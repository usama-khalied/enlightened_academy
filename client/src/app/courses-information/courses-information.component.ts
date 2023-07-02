import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-courses-information',
  templateUrl: './courses-information.component.html',
  styleUrls: ['./courses-information.component.css']
})
export class CoursesInformationComponent {
  selectedCourses:any[];

  constructor(private http: HttpClient){
    this.selectedCourses =[];
    this.fetchCourses()
  }
  selectCourses(){
    for(let i =0;i<15;i++){
      this.selectedCourses[i] = {"id": i}
    }
  }
  fetchCourses(): void {
    const apiUrl = 'http://localhost:8080/courses/';
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        this.selectedCourses = response.data.map((course: any) => ({
          ...course,
          checked: false,
        }));
      },
      (error) => {
        console.error('Failed to fetch courses:', error);
      }
    );
  }

}
