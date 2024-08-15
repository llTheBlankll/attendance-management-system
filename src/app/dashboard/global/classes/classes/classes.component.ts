import {Component} from '@angular/core';
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {

}
