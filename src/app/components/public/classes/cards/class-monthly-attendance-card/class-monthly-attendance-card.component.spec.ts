import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassMonthlyAttendanceCardComponent} from './class-monthly-attendance-card.component';

describe('ClassMonthlyAttendanceCardComponent', () => {
  let component: ClassMonthlyAttendanceCardComponent;
  let fixture: ComponentFixture<ClassMonthlyAttendanceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassMonthlyAttendanceCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassMonthlyAttendanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
