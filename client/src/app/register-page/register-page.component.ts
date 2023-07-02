import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../service/student.service';
import { Student } from '../model/Student';
import { EnrollementService } from '../service/enrollment.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

interface Course {
  id: string;
  name: string;
  description: string;
  fee: number;
  checked: boolean;
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  studentDataForm: FormGroup;
  availableCourses: Course[];
  studentId: any;
  courseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private studentService: StudentService,
    private enrollmentService: EnrollementService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.availableCourses = [];
    this.studentDataForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      CNIC: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      fathersCNIC: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^0\d{10}$/)]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });

    this.courseForm = this.formBuilder.group({
      selectedCourses: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    const apiUrl = 'http://localhost:8080/courses/';
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        this.availableCourses = response.data.map((course: any) => ({
          ...course,
          checked: false,
        }));
      },
      (error) => {
        console.error('Failed to fetch courses:', error);
      }
    );
  }

  submitForm(): void {
    if (this.studentDataForm.valid) {
      console.log('Form submitted:', this.studentDataForm.value);
    } else {
      console.log('Invalid entries in form');
    }
    // Handle form submission logic here
  }

  updateCourseSelection(): void {
    this.courseForm.patchValue({
      selectedCourses: this.availableCourses.filter((course) => course.checked),
    });
  }

  async postStudent(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const formValues = this.studentDataForm.value;

      const studentData: Student = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        address: formValues.address,
        phoneNumber: formValues.phone,
        gender: formValues.gender,
        birthDate: formValues.dateOfBirth,
        cnic: formValues.CNIC,
        parentCNIC: formValues.fathersCNIC,
      };

      this.studentService.addStudent(studentData).subscribe(
        (response) => {
          console.log('Success!', response);
          // Store the ID from the response
          this.studentId = response.data.id;
          resolve();
        },
        (error) => {
          console.error('Error!', error);
          const errorMessage = error.error?.error || 'An unexpected error occurred.'; // Use the server's error message if available
          this.dialog.open(ErrorDialogComponent, {
            data: { message: errorMessage },
          });
          reject();
        }
      );
    });
  }

  async postEnrollment(): Promise<void> {
    try {
      await this.postStudent();
    } catch {
      return;
    }

    const checkedCourses = this.availableCourses.filter((course) => course.checked);

    // Create a list of course ids
    const requestBody = checkedCourses.map((course) => {
      return { id: course.id };
    });

    this.enrollmentService.enrollStudent(this.studentId, requestBody).subscribe(
      (response) => {
        console.log('Success!', response);
        this.dialog.open(SuccessDialogComponent, {
          data: { message: 'Registration successful! You will hear from us soon!' },
        });
        this.router.navigate(['/']); // navigate to home page
      },
      (error) => {
        console.error('Error!', error);
        const errorMessage = error.error?.error || 'An unexpected error occurred.'; // Use the server's error message if available
        this.dialog.open(ErrorDialogComponent, {
          data: { message: errorMessage },
        });
        this.router.navigate(['register']);
      }
    );
  }

  isCourseSelected(): boolean {
    return this.availableCourses.some((course) => course.checked);
  }
}
