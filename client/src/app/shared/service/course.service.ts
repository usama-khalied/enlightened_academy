import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  // Get All Courses
  getCourses(): Observable<any> {
    return this.http.get<any>(`${environment?.apiUrl}courses/`);
  }
}
