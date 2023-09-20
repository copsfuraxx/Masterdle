import {Injectable} from "@angular/core";
import {map, Observable, of} from "rxjs";
import {StudentBo, SubmitAnswerBo} from "../../app/student-dle/student-dle.model";

export interface Student {
    firstName: string,
    lastName: string,
    gamerType: string,
    studyType: string,
    entryLevel: string
}

@Injectable({
  providedIn: 'root'
})
export class StudentRepository {

  soluce: Student = {
      firstName: 'Jules',
      lastName : 'Finck',
      gamerType : 'casual',
      studyType : 'try-hard',
      entryLevel : 'L3'
    }

  getStudents(): Observable<StudentBo[]> {
    return of([
        this.soluce,
      {
        firstName: 'Thomas',
        lastName: 'Vaté',
        gamerType: 'try-hard',
        studyType: 'lazy',
        entryLevel: 'L1'
      },
      {
        firstName: 'Kylian',
        lastName: 'Bachelet',
        gamerType: 'casual',
        studyType: 'ouga-bouga',
        entryLevel: 'L1'
      },
      {
        firstName: 'Coraline',
        lastName: 'Caillet',
        gamerType: 'try-hard',
        studyType: 'try-hard',
        entryLevel: 'L3'
      }
    ]).pipe(
      map((students: Student[]) => students.map((student: Student) => new StudentBo(student)))
    )
  }

  submitSoluce(student: StudentBo): SubmitAnswerBo {
    let studentDto: Student = StudentMapper.mapToDto(student);
    let bool = [
      studentDto.firstName === this.soluce.firstName && studentDto.lastName === this.soluce.lastName,
      studentDto.gamerType === this.soluce.gamerType,
      studentDto.studyType === this.soluce.studyType,
      studentDto.entryLevel === this.soluce.entryLevel
    ];
    return new SubmitAnswerBo(bool);

  }

}

export class StudentMapper {
  static mapToBo(student: Student): StudentBo {
    return new StudentBo(student);
  }

  static mapToDto(studentBo: StudentBo): Student {
    return {
      firstName: studentBo.firstName,
      lastName: studentBo.lastName,
      gamerType: studentBo.attributes[0]._value,
      studyType: studentBo.attributes[1]._value,
      entryLevel: studentBo.attributes[2]._value
    }
  }
}
