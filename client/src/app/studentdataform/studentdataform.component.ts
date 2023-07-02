import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-studentdataform',
  templateUrl: './studentdataform.component.html',
  styleUrls: ['./studentdataform.component.css']
})
export class StudentdataformComponent {
  studentDataForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.studentDataForm  = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      age: new FormControl(''),
      dateOfBirth: new FormControl('')
      ,
      gender: new FormControl(''),
      address: new FormControl('')
    });
  }
  submitForm(){
    console.log(this.studentDataForm.value)
  }
}
