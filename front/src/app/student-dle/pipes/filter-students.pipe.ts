import { Pipe, PipeTransform } from '@angular/core';
import {StudentBo} from "../student-dle.model";

@Pipe({
  name: 'filterStudents'
})
export class FilterStudentsPipe implements PipeTransform {

  transform(value: StudentBo[], filter:string): StudentBo[] {
    if (!filter) {
      return value;
    }
    return value.filter((student: StudentBo) => student.name.toLowerCase().includes(filter.toLowerCase()));
  }

}
