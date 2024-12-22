import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AttendanceComponent} from './attendance.component';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {
  ManualAttendanceInputComponent
} from '../../../components/shared/attendances/manual-attendance-input/manual-attendance-input.component';
import {
  AttendanceTableComponent
} from '../../../components/shared/attendances/attendance-table/attendance-table.component';
import {
  EditAttendanceFormComponent
} from '../../../components/shared/attendances/edit-attendance-form/edit-attendance-form.component';
import {AttendanceService} from '../../../../core/services/attendance/attendance.service';
import {of} from 'rxjs';

describe('AttendanceComponent', () => {
  let component: AttendanceComponent;
  let fixture: ComponentFixture<AttendanceComponent>;
  let mockAttendanceService: jasmine.SpyObj<AttendanceService>;

  beforeEach(async () => {
    mockAttendanceService = jasmine.createSpyObj('AttendanceService', ['getTodayAttendances', 'addAttendance', 'updateAttendance']);
    mockAttendanceService.getTodayAttendances.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        CardModule,
        DialogModule,
        ManualAttendanceInputComponent,
        AttendanceTableComponent,
        EditAttendanceFormComponent,
        AttendanceComponent
      ],
      providers: [
        {provide: AttendanceService, useValue: mockAttendanceService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests as needed
});
