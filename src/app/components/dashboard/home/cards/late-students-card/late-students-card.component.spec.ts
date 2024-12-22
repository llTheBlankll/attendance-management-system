import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LateStudentsCardComponent} from './late-students-card.component';

describe('LateStudentsCardComponent', () => {
  let component: LateStudentsCardComponent;
  let fixture: ComponentFixture<LateStudentsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LateStudentsCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LateStudentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
