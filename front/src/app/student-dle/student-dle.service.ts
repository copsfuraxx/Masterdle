import { Injectable } from '@angular/core';
import {Student, StudentRepository} from "../../infrastructure/student/student.repository";
import {map, Observable } from "rxjs";
import {StudentBo, SubmitAnswerBo} from "./student-dle.model";

@Injectable({
  providedIn: 'root'
})
export class StudentDleService {

  constructor(
    private studentRepository: StudentRepository,
  ) { }

  getStudents():Observable<StudentBo[]> {
    return this.studentRepository.getStudents();
  }

  submitSoluce(student: StudentBo): SubmitAnswerBo {
    return this.studentRepository.submitSoluce(student);
  }
}
