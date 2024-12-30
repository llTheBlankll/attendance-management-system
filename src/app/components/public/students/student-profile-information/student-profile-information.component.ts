import {Component, Input} from '@angular/core';
import {CardModule} from 'primeng/card';
import {FloatLabelModule} from 'primeng/floatlabel';
import {ImageModule} from 'primeng/image';
import {InputTextModule} from 'primeng/inputtext';
import {Student} from '../../../../core/types/dto/student/Student';
import {AddStudentDialogComponent} from "../dialogs/add-student-dialog/add-student-dialog.component";

@Component({
  selector: 'students-profile-information',
  standalone: true,
  imports: [CardModule, ImageModule, FloatLabelModule, InputTextModule, AddStudentDialogComponent],
  templateUrl: './student-profile-information.component.html',
  styleUrl: './student-profile-information.component.css',
})
export class StudentProfileInformationComponent {
  @Input()
  public studentInformation?: Student;
}
