import {Component, Input, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {Student} from "../../../../../interfaces/dto/Student";

@Component({
  selector: 'classes-students-list-card',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './class-students-list-card.component.html',
  styleUrl: './class-students-list-card.component.css'
})
export class ClassStudentsListCardComponent implements OnInit {

  @Input()
  public students?: Student[];

  ngOnInit() {

  }
}
