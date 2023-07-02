import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student } from 'src/app/model/Student'; //Path to your Student interface
import { HttpResponse } from 'src/app/model/HttpResponse';
@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private apiURL = 'http://localhost:8080/students/';

    constructor(private http: HttpClient) { }

    addStudent(student: Student): Observable<HttpResponse> {
        return this.http.post<HttpResponse>(this.apiURL, student)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: any) {
        console.error('Something went wrong', error);
        return throwError(error);
    }
}