import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassTodaysActivitiesCardComponent} from './class-todays-activities-card.component';

describe('ClassTodaysActivitiesCardComponent', () => {
  let component: ClassTodaysActivitiesCardComponent;
  let fixture: ComponentFixture<ClassTodaysActivitiesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassTodaysActivitiesCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassTodaysActivitiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
