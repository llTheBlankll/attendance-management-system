import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallAttendanceCardComponent } from './overall-attendance-card.component';

describe('OverallAttendanceCardComponent', () => {
  let component: OverallAttendanceCardComponent;
  let fixture: ComponentFixture<OverallAttendanceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverallAttendanceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallAttendanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
