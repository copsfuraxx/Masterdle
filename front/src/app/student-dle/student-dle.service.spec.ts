import { TestBed } from '@angular/core/testing';

import { StudentDleService } from './student-dle.service';

describe('StudentDleService', () => {
  let service: StudentDleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentDleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
