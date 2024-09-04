import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {Student} from "../../../../interfaces/dto/Student";
import {ClassService} from "../../../../services/class/class.service";
import {StrandService} from "../../../../services/strand/strand.service";
import {GradeLevelService} from "../../../../services/grade-level/grade-level.service";
import {GuardianService} from "../../../../services/guardian/guardian.service";
import {Class} from "../../../../interfaces/dto/Class";
import {GradeLevel} from "../../../../interfaces/dto/GradeLevel";
import {Guardian} from "../../../../interfaces/dto/Guardian";
import {Strand} from "../../../../interfaces/dto/Strand";

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
export class StudentProfileInformationComponent implements OnChanges {

  // * Injections
  private readonly classService = inject(ClassService);
  private readonly guardianService = inject(GuardianService);
  private readonly strandService = inject(StrandService);
  private readonly gradeLevelService = inject(GradeLevelService);

  @Input()
  public studentInformation: Student | undefined = undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["studentInformation"]) {
      this.studentInformation = changes["studentInformation"].currentValue;
      // Populate student information
      if (this.studentInformation !== undefined) {
        this.populateStudentInformation(this.studentInformation);
      }
    }
  }

  public async populateStudentInformation(student: Student) {
    console.log(student);
    // Get student information classes, grade level, and strand
    if (student !== undefined) {
      const guardian = await this.getStudentGuardian(student);
      const gradeLevel = await this.getStudentGradeLevel(student);
      const strand = await this.getStudentStrand(student);
      const classroom = await this.getStudentClassroom(student);
      this.studentInformation = {
        ...student,
        guardian: guardian,
        gradeLevel: gradeLevel,
        strand: strand,
        classroom: classroom
      }
      console.error(this.studentInformation);
    } else {
      console.log("Student is undefined");
    }
  }

  private async getStudentGuardian(student: Student) {
    const guardian = await this.guardianService.getGuardianDocByReference(student.guardian);
    if (guardian.exists()) {
      return guardian.data() as Guardian;
    } else {
      return undefined;
    }
  }

  private async getStudentGradeLevel(student: Student) {
    const gradeLevel = await this.gradeLevelService.getGradeLevelDocByReference(student.gradeLevel);
    if (gradeLevel.exists()) {
      return gradeLevel.data() as GradeLevel;
    } else {
      return undefined;
    }
  }

  private async getStudentStrand(student: Student) {
    const strand = await this.strandService.getStrandDocByReference(student.strand);
    if (strand.exists()) {
      return strand.data() as Strand;
    } else {
      return undefined;
    }
  }

  private async getStudentClassroom(student: Student) {
    const classroom = await this.classService.getClassroomDocByReference(student.classroom);
    if (classroom.exists()) {
      return classroom.data() as Class;
    } else {
      return undefined;
    }
  }
}
