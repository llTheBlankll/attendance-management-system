import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { Student } from '../../../../core/interfaces/dto/student/Student';

@Component({
  selector: 'students-profile-information',
  standalone: true,
  imports: [CardModule, ImageModule, FloatLabelModule, InputTextModule],
  templateUrl: './student-profile-information.component.html',
  styleUrl: './student-profile-information.component.css',
})
export class StudentProfileInformationComponent {
  @Input()
  public studentInformation?: Student;
}
