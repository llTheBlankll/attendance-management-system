import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ManualAttendanceInputComponent} from './manual-attendance-input.component';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';

describe('ManualAttendanceInputComponent', () => {
  let component: ManualAttendanceInputComponent;
  let fixture: ComponentFixture<ManualAttendanceInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CardModule,
        InputTextModule,
        DropdownModule,
        CalendarModule,
        InputTextareaModule,
        ButtonModule,
        ManualAttendanceInputComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManualAttendanceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests as needed
});
