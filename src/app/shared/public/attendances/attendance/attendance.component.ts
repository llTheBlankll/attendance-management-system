import {Component} from '@angular/core';
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {

}
