import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { Classroom } from '../../../../interfaces/dto/classroom/Classroom';
import { GradeLevel } from '../../../../interfaces/dto/grade-level/GradeLevel';
import { Guardian } from '../../../../interfaces/dto/guardian/Guardian';
import { Strand } from '../../../../interfaces/dto/strand/Strand';
import { Student } from '../../../../interfaces/dto/student/Student';
import { GradeLevelService } from '../../../../services/grade-level/grade-level.service';
import { StrandService } from '../../../../services/strand/strand.service';
import { GuardianService } from '../../../../services/guardian/guardian.service';
import { ClassroomService } from '../../../../services/classroom/classroom.service';

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
