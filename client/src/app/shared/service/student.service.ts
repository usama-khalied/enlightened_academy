import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student } from '../model/Student';
import { HttpResponse } from '../model/HttpResponse';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  selectedCourse!: any[];
  allCourses!: any[];

  constructor(private http: HttpClient, public Location: Location) {
    this.selectedCourse = []
    this.allCourses = []
  }

  addStudent(student: Student): Observable<HttpResponse> {
    return this.http
      .post<HttpResponse>(`${environment?.apiUrl}students/`, student)
      .pipe(catchError(this.handleError));
  }
  //   Error Handling
  private handleError(error: any) {
    console.error('Something went wrong', error);
    return throwError(error);
  }

  // Check Student Exist or  not through Cnic, Email & Phone Number
  studentCheck(value: number | string, type: 'cnic' | 'phoneNumber' | 'email'): Observable<any> {
    const params = new HttpParams().set(type, value.toString());
    const apiUrl = `${environment.apiUrl}students/find/`;

    return this.http.get<any>(apiUrl, { params });
  }
  getBack() {
    this.Location.back();
  }

}
interface Course {
  id: string;
  name: string;
  description: string;
  fee: number;
  checked: boolean;
}
