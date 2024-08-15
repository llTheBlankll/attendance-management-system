import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassAbsentStudentCardComponent} from './class-absent-student-card.component';

describe('ClassAbsentStudentCardComponent', () => {
  let component: ClassAbsentStudentCardComponent;
  let fixture: ComponentFixture<ClassAbsentStudentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassAbsentStudentCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassAbsentStudentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
