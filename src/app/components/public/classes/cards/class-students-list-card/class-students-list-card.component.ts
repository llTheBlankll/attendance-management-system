import {Component, Input} from '@angular/core';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {Student} from '../../../../../core/types/dto/student/Student';
import {StudentViewDialogComponent} from '../../../students/dialogs/student-view-dialog/student-view-dialog.component';

@Component({
  selector: 'classes-students-list-card',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
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
