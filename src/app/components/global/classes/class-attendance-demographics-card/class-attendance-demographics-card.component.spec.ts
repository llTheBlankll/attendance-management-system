import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassAttendanceDemographicsCardComponent} from './class-attendance-demographics-card.component';

describe('ClassAttendanceDistributionCardComponent', () => {
  let component: ClassAttendanceDemographicsCardComponent;
  let fixture: ComponentFixture<ClassAttendanceDemographicsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassAttendanceDemographicsCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassAttendanceDemographicsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
