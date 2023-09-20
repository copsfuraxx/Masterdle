import {Student} from "../../infrastructure/student/student.repository";

export class Attribute<T>{
  _name: string;
  _value: T;

  constructor(name: string, value: T) {
    this._name = name;
    this._value = value;
  }
}

export class SubmitAnswerBo {
  isSoluce: boolean;
  attributes: Attribute<boolean>[];

  constructor(bools: boolean[]) {
    this.isSoluce = bools[0];
    this.attributes = [
      new Attribute("gamerType", bools[1]),
      new Attribute("studyType", bools[2]),
      new Attribute("entryLevel", bools[3])
    ];
  }
}

export class StudentBo{
  public firstName: string;
  public lastName: string;
  public attributes: Attribute<string>[];
  public submitAnswer: SubmitAnswerBo | null = null;
  public submitted: boolean = false;

  constructor(student:Student) {
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.attributes = [
      new Attribute("gamerType", student.gamerType),
      new Attribute("studyType", student.studyType),
      new Attribute("entryLevel", student.entryLevel)
    ];
  }

  get name(): string {
    return this.firstName + " " + this.lastName;
  }
}
