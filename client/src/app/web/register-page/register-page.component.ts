import { Component, Directive, OnInit } from '@angular/core';
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
import { VoucherService } from 'src/app/shared/service/voucher.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { CourseService } from 'src/app/shared/service/course.service';


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
    private courseService:CourseService,
    private enrollmentService: EnrollementService,
    private router: Router,
    private dialog: MatDialog,
    public voucherService: VoucherService
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
    this.courseService.getCourses().subscribe({
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
        this.voucherService.getStudentAndCourseListById(this.studentId);
        const dialogRef = this.dialog.open(SuccessDialogComponent, {
          data: {
            message: 'Registration successful! You will hear from us soon!',
            downloadPdf: 'Download PDF',
            studentId: this.studentId
          }
        });
      },
      (error) => {
        const errorMessage =
          error.error?.error || 'An unexpected error occurred.';
        this.dialog.open(ErrorDialogComponent, {
          data: { message: errorMessage }
        });
        this.router.navigate(['register']);
      }
    );


  }
  ondi(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      height: '200px',
      data: {
        message: 'Are you sure you want to proceed with the Registration ?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // this.postEnrollment();

      }
    });
  }
  isCourseSelected(): boolean {
    return this.availableCourses.some((course) => course.checked);
  }

  errorDialog(message: string, Status: number): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: message, status: Status },
    });
  }
  getBack() {
    this.studentService.getBack();
  }
  onSubmit(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      height: '200px',
      data: {
        message: 'Are you sure you want to proceed with the Registration ?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.postEnrollment();

      }
    });
  }

  isExisting(value: any, type: 'cnic' | 'email' | 'phoneNumber') {
    let errorMessage = '';
    if (type === 'email') {
      errorMessage = 'Email Already Exists';
    } else if (type === 'phoneNumber') {
      errorMessage = 'Phone Number Already Exists';
    } else if (type === 'cnic') {
      errorMessage = 'Cnic Already Exists';
    }

    this.checkIfExistsAndHandleError(value.target.value, type, errorMessage);
  }

  private checkIfExistsAndHandleError(
    value: any,
    type: 'cnic' | 'email' | 'phoneNumber',
    errorMessage: string
  ): void {
    this.studentService.studentCheck(value, type).subscribe({
      next: (res: any) => {
        if (res.status === 409) {
          this.errorDialog(errorMessage, 409);
        }
      },
      error: (error: any) => {
        this.errorDialog(errorMessage, 409);
        if (type === 'email') {
          this.studentDataForm.controls['email'].setValue(null);
        } else if (type === 'phoneNumber') {
          this.studentDataForm.controls['phone'].setValue(null);
        } else if (type === 'cnic') {
          this.studentDataForm.controls['CNIC'].setValue(null);
        }
      },
    });
  }

}

interface Course {
  id: string;
  name: string;
  description: string;
  fee: number;
  checked: boolean;
}
