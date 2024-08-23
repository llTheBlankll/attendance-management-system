import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassOverAllAttendanceComponent} from './class-over-all-attendance.component';

describe('ClassTotalStudentCardComponent', () => {
  let component: ClassOverAllAttendanceComponent;
  let fixture: ComponentFixture<ClassOverAllAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassOverAllAttendanceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassOverAllAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
