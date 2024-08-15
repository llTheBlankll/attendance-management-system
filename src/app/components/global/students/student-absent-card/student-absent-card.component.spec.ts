import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentAbsentCardComponent} from './student-absent-card.component';

describe('StudentAbsentCardComponent', () => {
  let component: StudentAbsentCardComponent;
  let fixture: ComponentFixture<StudentAbsentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAbsentCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StudentAbsentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
