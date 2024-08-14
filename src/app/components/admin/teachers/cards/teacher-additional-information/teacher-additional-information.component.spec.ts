import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TeacherAdditionalInformationComponent} from './teacher-additional-information.component';

describe('TeacherAdditionalInformationComponent', () => {
  let component: TeacherAdditionalInformationComponent;
  let fixture: ComponentFixture<TeacherAdditionalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAdditionalInformationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeacherAdditionalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
