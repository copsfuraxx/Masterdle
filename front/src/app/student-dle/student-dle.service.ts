import { Injectable } from '@angular/core';
import {Student, StudentRepository} from "../../infrastructure/student/student.repository";
import {map, Observable } from "rxjs";
import {StudentBo} from "./student-dle.model";

@Injectable({
  providedIn: 'root'
})
export class StudentDleService {

  constructor(
    private studentRepository: StudentRepository,
  ) { }

  getStudents():Observable<StudentBo[]> {
    return this.studentRepository.getStudents().pipe(
      map((students: Student[]) => students.map((student: Student) => new StudentBo(student)))
    );
  }
}
