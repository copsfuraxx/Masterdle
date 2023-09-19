import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDlePageComponent } from './containers/student-dle-page/student-dle-page.component';
import {StudentDleRoutingModule} from "./student-dle-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import { FilterStudentsPipe } from './pipes/filter-students.pipe';



@NgModule({
  declarations: [
    StudentDlePageComponent,
    FilterStudentsPipe
  ],
  imports: [
    StudentDleRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class StudentDleModule { }
