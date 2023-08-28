import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiUtilsService {
  // selectedCourse: any[];
  // allCourses: any[];

  constructor(private http: HttpClient) {
    // this.selectedCourse = []
    // this.allCourses = []
  }
  // fetchCourses() {
  //   const apiUrl = `${environment.apiUrl}courses/`;
  //   this.http.get(apiUrl).subscribe(
  //     (response: any) => {
  //       let data = response.data;
  //       for (let course of data) {
  //         course.checked = false;
  //         this.allCourses.push(course)
  //       }
  //     },
  //     error => {
  //       console.error('There was an error during the request', error);
  //     }
  //   );
  // }

}
