import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassLateStudentCardComponent} from './class-late-student-card.component';

describe('ClassLateStudentCardComponent', () => {
  let component: ClassLateStudentCardComponent;
  let fixture: ComponentFixture<ClassLateStudentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassLateStudentCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassLateStudentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
