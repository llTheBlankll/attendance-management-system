import {Component, Input} from '@angular/core';
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {Student} from "../../../../interfaces/dto/Student";

@Component({
  selector: 'students-profile-information',
  standalone: true,
  imports: [
    CardModule,
    ImageModule,
    FloatLabelModule,
    InputTextModule
  ],
  templateUrl: './student-profile-information.component.html',
  styleUrl: './student-profile-information.component.css'
})
export class StudentProfileInformationComponent {

  @Input()
  public studentInformation: Student | undefined = undefined;
}
