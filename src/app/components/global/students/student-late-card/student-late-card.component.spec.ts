import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentLateCardComponent} from './student-late-card.component';

describe('StudentLateCardComponent', () => {
  let component: StudentLateCardComponent;
  let fixture: ComponentFixture<StudentLateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLateCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StudentLateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
