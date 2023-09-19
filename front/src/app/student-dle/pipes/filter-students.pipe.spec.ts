import { FilterStudentsPipe } from './filter-students.pipe';

describe('FilterStudentsPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterStudentsPipe();
    expect(pipe).toBeTruthy();
  });
});
