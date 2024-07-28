import { Component } from '@angular/core';
import {SidebarComponent} from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {

}
