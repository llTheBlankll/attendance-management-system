import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentOverallAttendanceCardComponent} from './student-overall-attendance-card.component';

describe('StudentOverallAttendanceCardComponent', () => {
  let component: StudentOverallAttendanceCardComponent;
  let fixture: ComponentFixture<StudentOverallAttendanceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentOverallAttendanceCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StudentOverallAttendanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
