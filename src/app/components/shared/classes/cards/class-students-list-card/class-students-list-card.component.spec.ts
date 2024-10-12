import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassStudentsListCardComponent} from './class-students-list-card.component';

describe('ClassStudentsListCardComponent', () => {
  let component: ClassStudentsListCardComponent;
  let fixture: ComponentFixture<ClassStudentsListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassStudentsListCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassStudentsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
