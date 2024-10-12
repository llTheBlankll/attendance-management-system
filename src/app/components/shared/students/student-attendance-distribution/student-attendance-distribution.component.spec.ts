import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentAttendanceDistributionComponent} from './student-attendance-distribution.component';

describe('StudentAttendanceDistributionComponent', () => {
  let component: StudentAttendanceDistributionComponent;
  let fixture: ComponentFixture<StudentAttendanceDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAttendanceDistributionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StudentAttendanceDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
