import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AbsentStudentsCardComponent} from './absent-students-card.component';

describe('AbsentStudentsCardComponent', () => {
  let component: AbsentStudentsCardComponent;
  let fixture: ComponentFixture<AbsentStudentsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsentStudentsCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AbsentStudentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
