import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { animate, style, transition, trigger } from '@angular/animations';
import { VoucherService } from '../service/voucher.service';
import { Student } from '../model/Student';
import { HttpResponse } from '../model/HttpResponse';
import { Enrollment } from '../model/Enrollment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class SuccessDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string, downloadPdf?: string, studentId: any },
    public voucherService: VoucherService,
    private dialogRef: MatDialogRef<SuccessDialogComponent>, private router: Router,) { }

 
  generatePdf(): void {
    this.voucherService.getStudentAndCourseListById(this.data?.studentId).subscribe({
      next: (response: HttpResponse) => {
        const student = response.data as Student;
        if (student) {
          this.voucherService.student = [student];
          this.voucherService.courseList = student.enrollments as unknown as Enrollment[];
          this.voucherService.calculateTotalFee();
          this.voucherService.runReport('Enlightened Academy');
        } else {
          console.error('Student data not found.');
        }
      },
      error: (error) => {
        console.error('API error:', error);
      }
    });
  }


  // generatePdf():void {
  //   this.voucherService.getStudentAndCourseListById(this.data?.studentId).subscribe((response:HttpResponse) => {
  //     const student = response.data as Student;
  //     this.voucherService.student = [student];
  //     this.voucherService.courseList = student.enrollments as unknown as Enrollment[];
  //   })

  // }

}
