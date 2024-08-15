import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassTotalStudentCardComponent} from './class-total-student-card.component';

describe('ClassTotalStudentCardComponent', () => {
  let component: ClassTotalStudentCardComponent;
  let fixture: ComponentFixture<ClassTotalStudentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassTotalStudentCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassTotalStudentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
