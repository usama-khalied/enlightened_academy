import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

    {
      path: '',component : LoginComponent
    },  
  ];

@NgModule({
    declarations: [
     LoginComponent
    ],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
    ],

  })
  export class LoginModule {}