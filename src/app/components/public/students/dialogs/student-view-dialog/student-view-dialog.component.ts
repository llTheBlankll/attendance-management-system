import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {ImageModule} from 'primeng/image';
import {Student} from '../../../../../core/types/dto/student/Student';

@Component({
  selector: 'app-student-view-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, ImageModule],
  template: `
      <p-dialog
              [(visible)]="visible"
              [style]="{ width: '40vw' }"
              [modal]="true"
              [draggable]="false"
              [resizable]="false"
              header="Student Details"
      >
          <div class="grid">
              <div class="col-12 md:col-4">
                  <p-image
                          [src]="student?.profilePicture || '/school-logo.png'"
                          alt="Student Photo"
                          width="100%"
                          [preview]="true"
                  >
                  </p-image>
              </div>
              <div class="col-12 md:col-8">
                  <h2>
                      {{ student?.firstName }} {{ student?.middleInitial }}
                      {{ student?.lastName }}
                  </h2>
                  <p><strong>Sex:</strong> {{ student?.sex }}</p>
                  <p><strong>Birth Date:</strong> {{ student?.birthDate | date }}</p>
                  <p><strong>Address:</strong> {{ student?.address }}</p>
                  <p><strong>Grade Level:</strong> {{ student?.gradeLevel?.name }}</p>
                  <p><strong>Strand:</strong> {{ student?.strand?.name }}</p>
                  <!-- TODO: Add more student details as needed -->
              </div>
          </div>
          <ng-template pTemplate="footer">
              <p-button
                      icon="pi pi-check"
                      (click)="visibleChange.emit()"
                      label="Close"
                      styleClass="p-button-text"
              ></p-button>
          </ng-template>
      </p-dialog>
  `,
  styles: [],
})
export class StudentViewDialogComponent implements OnChanges {
  @Input() student: Student | undefined;
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<void> = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student']) {
      console.log(changes['student'].currentValue);
    }
  }
}
