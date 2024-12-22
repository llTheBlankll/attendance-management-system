import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AttendanceTableComponent} from './attendance-table.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DatePipe} from '@angular/common';

describe('AttendanceTableComponent', () => {
  let component: AttendanceTableComponent;
  let fixture: ComponentFixture<AttendanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableModule, ButtonModule, DatePipe, AttendanceTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AttendanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests as needed
});
