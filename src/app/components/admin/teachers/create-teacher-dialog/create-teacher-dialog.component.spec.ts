import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateTeacherDialogComponent} from './create-teacher-dialog.component';

describe('CreateTeacherDialogComponent', () => {
  let component: CreateTeacherDialogComponent;
  let fixture: ComponentFixture<CreateTeacherDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTeacherDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateTeacherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
