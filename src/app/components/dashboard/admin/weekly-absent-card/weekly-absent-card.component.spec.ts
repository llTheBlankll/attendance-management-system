import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyAbsentCardComponent } from './weekly-absent-card.component';

describe('WeeklyAbsentCardComponent', () => {
  let component: WeeklyAbsentCardComponent;
  let fixture: ComponentFixture<WeeklyAbsentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyAbsentCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyAbsentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
