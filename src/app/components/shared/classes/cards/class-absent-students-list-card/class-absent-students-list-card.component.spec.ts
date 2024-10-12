import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassAbsentStudentsListCardComponent} from './class-absent-students-list-card.component';

describe('ClassAbsentStudentsListCardComponent', () => {
  let component: ClassAbsentStudentsListCardComponent;
  let fixture: ComponentFixture<ClassAbsentStudentsListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassAbsentStudentsListCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassAbsentStudentsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
