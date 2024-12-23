import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentDialogComponent } from './edit-student-dialog.component';

describe('EditStudentDialogComponent', () => {
  let component: EditStudentDialogComponent;
  let fixture: ComponentFixture<EditStudentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStudentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
