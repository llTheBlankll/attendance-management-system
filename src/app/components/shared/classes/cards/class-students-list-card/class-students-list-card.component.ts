import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Button, ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { Student } from '../../../../../core/interfaces/dto/student/Student';
import { StudentViewDialogComponent } from '../../../students/dialogs/student-view-dialog/student-view-dialog.component';

@Component({
  selector: 'classes-students-list-card',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    ButtonDirective,
    Ripple,
    Button,
    StudentViewDialogComponent,
  ],
  templateUrl: './class-students-list-card.component.html',
  styleUrl: './class-students-list-card.component.css',
})
export class ClassStudentsListCardComponent {
  @Input()
  public students: Student[] = [];

  public selectedStudent: Student | undefined;
  public showStudentDialog: boolean = false;

  public closeStudentDialog() {
    this.selectedStudent = undefined;
    this.showStudentDialog = false;
  }

  public viewStudent(student: Student) {
    this.selectedStudent = student;
    this.showStudentDialog = true;
  }
}
