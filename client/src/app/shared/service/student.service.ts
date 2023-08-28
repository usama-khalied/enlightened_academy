import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student } from '../model/Student'; //Path to your Student interface
import { HttpResponse } from '../model/HttpResponse';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  selectedCourse!: any[];
  allCourses!: any[];
  
  constructor(private http: HttpClient,public Location:Location) {
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
  //   Get All Courses
  getCourses(): Observable<any> {
    return this.http.get<any>(`${environment?.apiUrl}courses/`);
  }
  //   Student Cnic Check
  studentCnicCheck(cnicnNo: number):Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}students/find/?cnic=${cnicnNo}`
    );
  }
  //   Student Phone No. Check
  studentPhoneNocheck(phoneNumber: number):Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}students/find/?phoneNumber=${phoneNumber}`
    );
  }
  // Student Email check
  studentEmailCheck(email: string) :Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}students/find/?email=${email}`
    );
  }
  getBack(){
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
