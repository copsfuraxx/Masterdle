import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

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

  getStudents(): Observable<Student[]> {
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
    ]);
  }

  submitSoluce(student: Student): boolean[] {
        return [
        student.firstName === this.soluce.firstName &&
        student.lastName === this.soluce.lastName,
        student.gamerType === this.soluce.gamerType,
        student.studyType === this.soluce.studyType,
        student.entryLevel === this.soluce.entryLevel,
        ]
  }

}
