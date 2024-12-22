import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TotalStudentsCardComponent} from './total-students-card.component';

describe('TotalStudentsCardComponent', () => {
  let component: TotalStudentsCardComponent;
  let fixture: ComponentFixture<TotalStudentsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalStudentsCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TotalStudentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
