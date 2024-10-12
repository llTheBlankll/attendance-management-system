import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { NgOptimizedImage } from '@angular/common';
import { Teacher } from '../../../../../core/interfaces/dto/teacher/Teacher';

@Component({
  selector: 'app-teacher-additional-information',
  standalone: true,
  imports: [
    CardModule,
    ImageModule,
    InputTextModule,
    AvatarModule,
    NgOptimizedImage,
  ],
  templateUrl: './teacher-additional-information.component.html',
  styleUrl: './teacher-additional-information.component.css',
})
export class TeacherAdditionalInformationComponent implements OnChanges {
  @Input()
  public teacher?: Teacher = {} as Teacher;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['teacher']) {
      this.teacher = changes['teacher'].currentValue;
      // TODO: Implement get teacher profile picture.
    }
  }
}
