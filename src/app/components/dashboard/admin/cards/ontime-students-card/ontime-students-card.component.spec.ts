import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OntimeStudentsCardComponent } from './ontime-students-card.component';
import { describe } from 'mocha';

describe('OntimeStudentsCardComponent', () => {
  let component: OntimeStudentsCardComponent;
  let fixture: ComponentFixture<OntimeStudentsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OntimeStudentsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OntimeStudentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
