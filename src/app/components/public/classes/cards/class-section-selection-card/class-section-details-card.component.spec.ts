import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassSectionDetailsCardComponent} from './class-section-details-card.component';

describe('ClassSectionSelectionCardComponent', () => {
  let component: ClassSectionDetailsCardComponent;
  let fixture: ComponentFixture<ClassSectionDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassSectionDetailsCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassSectionDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
