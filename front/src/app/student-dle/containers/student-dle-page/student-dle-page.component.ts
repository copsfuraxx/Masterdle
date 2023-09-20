import {Component, OnInit} from '@angular/core';
import {StudentDleService} from "../../student-dle.service";
import {Observable, of} from "rxjs";
import {FormControl} from "@angular/forms";
import {StudentBo} from "../../student-dle.model";

@Component({
  selector: 'app-student-dle-page',
  templateUrl: './student-dle-page.component.html',
  styleUrls: ['./student-dle-page.component.css'],
  host: {'class': "flex flex-col gap-10 items-center"}
})
export class StudentDlePageComponent implements OnInit{
  students$: Observable<StudentBo[]> = of([]);
  studentInput: FormControl<string | null> = new FormControl<string>('');
  randomStudent: StudentBo | null = null;
  studentsChosen: StudentBo[] = [];

  constructor(
    private studentDleService: StudentDleService,
  ) {}

  ngOnInit(): void {
    this.students$ = this.studentDleService.getStudents();
    this.students$.subscribe((students: StudentBo[]) => {
      this.randomStudent = students[Math.floor(Math.random() * students.length)];
    });
  }
  protected readonly Math = Math;

  selectStudent(student: StudentBo) {
    console.log(student);
    this.studentInput.setValue("");
    student.submitAnswer = this.studentDleService.submitSoluce(student);
    student.submitted = true;
    this.studentsChosen.unshift(student);
  }
}
