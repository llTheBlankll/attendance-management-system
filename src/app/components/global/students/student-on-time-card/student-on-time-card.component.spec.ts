import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentOnTimeCardComponent} from './student-on-time-card.component';

describe('StudentOnTimeCardComponent', () => {
  let component: StudentOnTimeCardComponent;
  let fixture: ComponentFixture<StudentOnTimeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentOnTimeCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StudentOnTimeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
