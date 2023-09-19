import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentDlePageComponent} from "./containers/student-dle-page/student-dle-page.component";

const routes: Routes = [
  {path: '', component: StudentDlePageComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentDleRoutingModule { }
