import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentProfileInformationComponent} from './student-profile-information.component';

describe('StudentProfileInformationComponent', () => {
  let component: StudentProfileInformationComponent;
  let fixture: ComponentFixture<StudentProfileInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProfileInformationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StudentProfileInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
