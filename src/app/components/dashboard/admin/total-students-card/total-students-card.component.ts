import { Component } from '@angular/core';
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-total-students-card',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './total-students-card.component.html',
  styleUrl: './total-students-card.component.css'
})
export class TotalStudentsCardComponent {

  totalStudents = 0;
}
