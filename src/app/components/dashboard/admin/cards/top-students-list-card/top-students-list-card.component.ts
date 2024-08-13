import { Component } from '@angular/core';
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-top-students-list-card',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './top-students-list-card.component.html',
  styleUrl: './top-students-list-card.component.css'
})
export class TopStudentsListCardComponent {

}
