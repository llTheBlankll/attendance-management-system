import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassSectionSelectionCardComponent} from './class-section-selection-card.component';

describe('ClassSectionSelectionCardComponent', () => {
  let component: ClassSectionSelectionCardComponent;
  let fixture: ComponentFixture<ClassSectionSelectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassSectionSelectionCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassSectionSelectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
