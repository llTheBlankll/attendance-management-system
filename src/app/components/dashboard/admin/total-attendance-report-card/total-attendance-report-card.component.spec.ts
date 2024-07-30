import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAttendanceReportCardComponent } from './total-attendance-report-card.component';

describe('TotalAttendanceReportCardComponent', () => {
  let component: TotalAttendanceReportCardComponent;
  let fixture: ComponentFixture<TotalAttendanceReportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalAttendanceReportCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalAttendanceReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
