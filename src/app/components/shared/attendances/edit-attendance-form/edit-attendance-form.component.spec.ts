import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EditAttendanceFormComponent } from './edit-attendance-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

describe('EditAttendanceFormComponent', () => {
  let component: EditAttendanceFormComponent;
  let fixture: ComponentFixture<EditAttendanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        DropdownModule,
        InputTextareaModule,
        ButtonModule,
        EditAttendanceFormComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAttendanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests as needed
});
