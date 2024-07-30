import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayActivitiesCardComponent } from './today-activities-card.component';

describe('TodayActivitiesCardComponent', () => {
  let component: TodayActivitiesCardComponent;
  let fixture: ComponentFixture<TodayActivitiesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayActivitiesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayActivitiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
