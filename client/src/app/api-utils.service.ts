import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiUtilsService {
  selectedCourse:any[];
  allCourses:any[];

  constructor(private http:HttpClient  ) { 
    this.selectedCourse=[]
    this.allCourses=[]
  }
  fetchCourses() {
    const apiUrl = "http://localhost:8080/courses/";
    this.http.get(apiUrl).subscribe(
      (response: any) => {  // Define the response as any type or a specific interface if you have one.
        console.log(response);
  
        // Access the data property from the response.
        let data = response.data;
        
        // Now data is an array, you can loop through it.
        for (let course of data) {
      
          console.log(course);
          // Now you can access properties of each course object like course.id, course.name, etc.
          console.log(course.id);
          
          console.log(course.name);
          console.log(course.fee);
          course.checked = false;
          this.allCourses.push(course)
          // newCourse:Course = new Course(course.id,course.name,course.fee);
          // And so on for other properties.
        }
      },
      error => {
        console.error('There was an error during the request', error);
      }
    );
  }

}
