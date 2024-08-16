import {Component} from '@angular/core';
import {CardModule} from "primeng/card";

@Component({
  selector: 'classes-students-list-card',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './class-students-list-card.component.html',
  styleUrl: './class-students-list-card.component.css'
})
export class ClassStudentsListCardComponent {

}
