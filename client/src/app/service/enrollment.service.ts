import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EnrollementService {
    constructor(private http: HttpClient) { }

    enrollStudent(studentId: string, requestBody: any[]): Observable<any> {
        return this.http.post<any>(`http://localhost:8080/enrollments/?studentId=${studentId}`, requestBody)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: any) {
        console.error('Something went wrong', error);
        return throwError(error);
    }
}
