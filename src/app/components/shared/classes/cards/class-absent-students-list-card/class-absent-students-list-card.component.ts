import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { of } from 'rxjs';
import { Student } from '../../../../../core/interfaces/dto/student/Student';
import { Sex } from '../../../../../core/enums/Sex';

@Component({
  selector: 'classes-absent-students-list-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './class-absent-students-list-card.component.html',
  styleUrl: './class-absent-students-list-card.component.css',
})
export class ClassAbsentStudentsListCardComponent {
  @Input()
  public absentStudents?: Student[];

  protected readonly of = of;
  protected readonly Sex = Sex;
}