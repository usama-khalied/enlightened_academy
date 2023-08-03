import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../../shared/service/student.service';
import { Student } from '../../shared/model/Student';
import { EnrollementService } from '../../shared/service/enrollment.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../shared/success-dialog/success-dialog.component';
import { HttpResponse } from 'src/app/shared/model/HttpResponse';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class RegisterPageComponent implements OnInit {
  studentDataForm: FormGroup;
  availableCourses: Course[] = [];
  studentId: any;
  loading: boolean = false;
  courseForm: FormGroup;
  selectedCourses: number[] = [];
  selectedDate: Date | undefined;

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
      qualification: ['', Validators.required],
    });

    this.courseForm = this.formBuilder.group({
      selectedCourses: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses() {
    this.loading = true;
    this.studentService.getCourses().subscribe({
      next: (response) => {
        this.loading = false;
        this.availableCourses = response.data.map((course: any) => ({
          ...course,
          checked: false,
        }));
      },
      error: (error) => console.error('Failed to fetch courses:', error),
    });
  }

  submitForm(): void {
    // if (this.studentDataForm.valid) {
    //   console.log('Form submitted:', this.studentDataForm.value);
    // } else {
    //   console.log('Invalid entries in form');
    // }
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
        qualification: formValues.qualification,
      };

      this.studentService.addStudent(studentData).subscribe({
        next: (response) => {
          console.log('Success!', response),
            (this.studentId = response.data.id),
            resolve();
        },
        error: (error) => {
          console.error('Error!', error);
          const errorMessage =
            error.error?.error || 'An unexpected error occurred.';
          this.dialog.open(ErrorDialogComponent, {
            data: { message: errorMessage },
          });
          reject();
        },
      });
    });
  }
  resetCNIC() {
    this.studentDataForm = this.formBuilder.group({
      CNIC: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
    });
  }
  async postEnrollment(): Promise<void> {
    try {
      await this.postStudent();
    } catch {
      return;
    }
    const checkedCourses = this.availableCourses.filter(
      (course) => course.checked
    );
    const requestBody = checkedCourses.map((course) => {
      return { id: course.id };
    });

    this.enrollmentService.enrollStudent(this.studentId, requestBody).subscribe(
      (response) => {
        // console.log('Success!', response);
        this.dialog.open(SuccessDialogComponent, {
          data: {
            message: 'Registration successful! You will hear from us soon!',
          },
        });
        this.router.navigate(['/']); // navigate to home page
      },
      (error) => {
        // console.error('Error!', error);
        const errorMessage =
          error.error?.error || 'An unexpected error occurred.'; // Use the server's error message if available
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

  cnicDuplicate(cnic: any) {
    let CnicNumber = cnic.target.value;
    this.studentService.studentCnicCheck(CnicNumber).subscribe({
      next: (res: HttpResponse) => {
        if (res.status === 409) {
          this.errorDialog('Cnic Already Exists', 409);
        }
      },
      error: (error: any) => {
        this.errorDialog('Cnic Already Exists', 409);
        this.studentDataForm.controls['CNIC'].setValue(null);
      },
    });
  }
  emailDuplicate(email: any) {
    let emailAddress = email.target.value;
    this.studentService.studentEmailCheck(emailAddress).subscribe({
      next: (res: HttpResponse) => {
        if (res.status === 409) {
          this.errorDialog('Email Already Exists', 409);
        }
      },
      error: (error: any) => {
        this.errorDialog('Email Already Exists', 409);
        this.studentDataForm.controls['email'].setValue(null);
      },
    });
  }
  phoneDuplicate(phone: any) {
    let phoneNumber = phone.target.value;
    this.studentService.studentPhoneNocheck(phoneNumber).subscribe({
      next: (res: HttpResponse) => {
        if (res.status === 409)
          this.errorDialog('Phone Number Already Exists', 409);
      },
      error: (error: any) => {
        console.log(error);
        this.errorDialog('Phone Number Already Exists', 409);
        // this.studentDataForm.controls["phone"].setErrors({ incorrect: true });
        this.studentDataForm.controls['phone'].setValue(null);
      },
    });
  }
  errorDialog(message: string, Status: number) {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: message, status: Status },
    });
  }
  getBack() {
    this.studentService.getBack();
  }
}

interface Course {
  id: string;
  name: string;
  description: string;
  fee: number;
  checked: boolean;
}
