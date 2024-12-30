import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentDialogComponent } from './add-student-dialog.component';

describe('AddStudentDialogComponent', () => {
  let component: AddStudentDialogComponent;
  let fixture: ComponentFixture<AddStudentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStudentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
