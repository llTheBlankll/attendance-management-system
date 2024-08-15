import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassOnTimeStudentCardComponent} from './class-on-time-student-card.component';

describe('ClassOnTimeStudentCardComponent', () => {
  let component: ClassOnTimeStudentCardComponent;
  let fixture: ComponentFixture<ClassOnTimeStudentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassOnTimeStudentCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassOnTimeStudentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
