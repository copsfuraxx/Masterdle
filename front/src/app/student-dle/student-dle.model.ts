import {Student} from "../../infrastructure/student/student.repository";

export class StudentBo{
  public firstName: string;
  public lastName: string;
  public gamerType: string;
  public studyType: string;
  public entryLevel: string;

  constructor(student:Student) {
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.gamerType = student.gamerType;
    this.studyType = student.studyType;
    this.entryLevel = student.entryLevel;
  }

  get name(): string {
    return this.firstName + " " + this.lastName;
  }



}
