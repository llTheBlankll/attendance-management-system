import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyAttendanceReportCardComponent } from './daily-attendance-report-card.component';

describe('DailyAttendanceReportCardComponent', () => {
  let component: DailyAttendanceReportCardComponent;
  let fixture: ComponentFixture<DailyAttendanceReportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyAttendanceReportCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyAttendanceReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
