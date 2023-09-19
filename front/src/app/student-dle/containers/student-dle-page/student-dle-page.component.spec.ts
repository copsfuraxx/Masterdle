import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDlePageComponent } from './student-dle-page.component';

describe('StudentDlePageComponent', () => {
  let component: StudentDlePageComponent;
  let fixture: ComponentFixture<StudentDlePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentDlePageComponent]
    });
    fixture = TestBed.createComponent(StudentDlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
