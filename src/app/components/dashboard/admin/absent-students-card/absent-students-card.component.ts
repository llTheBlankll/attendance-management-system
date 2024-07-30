import { Component } from '@angular/core';

@Component({
  selector: 'app-absent-students-card',
  standalone: true,
  imports: [],
  templateUrl: './absent-students-card.component.html',
  styleUrl: './absent-students-card.component.css'
})
export class AbsentStudentsCardComponent {

  absentStudents = 0;
}
