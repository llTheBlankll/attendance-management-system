import {Component, inject, Input} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {Button} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";
import {FloatLabelModule} from "primeng/floatlabel";
import { ClassroomDTO } from '../../../../../core/interfaces/dto/classroom/ClassroomDTO';
import { GradeLevel } from '../../../../../core/interfaces/dto/grade-level/GradeLevel';
import { Teacher } from '../../../../../core/interfaces/dto/teacher/Teacher';

@Component({
  selector: 'app-class-edit-dialog',
  standalone: true,
  imports: [
    DialogModule,
    Button,
    TooltipModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    ReactiveFormsModule
  ],
  providers:  [
    MessageService
  ],
  templateUrl: './class-edit-dialog.component.html',
  styleUrl: './class-edit-dialog.component.css'
})
export class ClassEditDialogComponent {

  // * Injections
  private readonly messageService = inject(MessageService);

  @Input()
  public classroom?: ClassroomDTO;
  isVisible: boolean = false;

  classroomForm: FormGroup = new FormGroup({
    classroomName: new FormControl(''),
    description: new FormControl(''),
    schoolYear: new FormControl(''),
    teacher: new FormControl({} as Teacher),
    gradeLevel: new FormControl({} as GradeLevel),
  });

  public editClassroom() {
    if (this.classroomForm.valid) {

    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields',
        life: 3000
      });
    }
  }
}
