import {Component, Input} from '@angular/core';
import {CardModule} from 'primeng/card';
import {of} from 'rxjs';
import {Student} from '../../../../../core/types/dto/student/Student';
import {Sex} from '../../../../../core/types/enums/Sex';

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

  get maleAbsentCount(): number {
    return this.absentStudents?.filter(s => s.sex === Sex.MALE).length ?? 0;
  }

  get femaleAbsentCount(): number {
    return this.absentStudents?.filter(s => s.sex === Sex.FEMALE).length ?? 0;
  }
}
