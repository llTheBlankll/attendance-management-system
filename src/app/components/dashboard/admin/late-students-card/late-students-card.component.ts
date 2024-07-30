import { Component } from '@angular/core';

@Component({
  selector: 'app-late-students-card',
  standalone: true,
  imports: [],
  templateUrl: './late-students-card.component.html',
  styleUrl: './late-students-card.component.css'
})
export class LateStudentsCardComponent {

  lateStudents = 0;
}
