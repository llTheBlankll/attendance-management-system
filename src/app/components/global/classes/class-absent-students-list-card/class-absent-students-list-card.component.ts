import {Component} from '@angular/core';
import {CardModule} from "primeng/card";

@Component({
  selector: 'classes-absent-students-list-card',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './class-absent-students-list-card.component.html',
  styleUrl: './class-absent-students-list-card.component.css'
})
export class ClassAbsentStudentsListCardComponent {

}
