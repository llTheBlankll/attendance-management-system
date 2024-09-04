import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailsAndSelectionCardComponent } from './student-details-and-selection-card.component';

describe('StudentDetailsAndSelectionCardComponent', () => {
  let component: StudentDetailsAndSelectionCardComponent;
  let fixture: ComponentFixture<StudentDetailsAndSelectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDetailsAndSelectionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDetailsAndSelectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
