import {Component, Input} from '@angular/core';
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {InputTextModule} from "primeng/inputtext";
import {Teacher} from "../../../../../interfaces/dto/Teacher";

@Component({
  selector: 'app-teacher-additional-information',
  standalone: true,
  imports: [
    CardModule,
    ImageModule,
    InputTextModule
  ],
  templateUrl: './teacher-additional-information.component.html',
  styleUrl: './teacher-additional-information.component.css'
})
export class TeacherAdditionalInformationComponent {

  @Input()
  public teacher: Teacher = {} as Teacher;
}
