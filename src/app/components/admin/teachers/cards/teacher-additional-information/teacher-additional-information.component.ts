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
import { TeacherService } from '../../../../../core/services/teacher/teacher.service';
import { MessageService } from 'primeng/api';

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
  providers: [MessageService],
  templateUrl: './teacher-additional-information.component.html',
  styleUrl: './teacher-additional-information.component.css',
})
export class TeacherAdditionalInformationComponent implements OnChanges {
  // * Injections
  private readonly teacherService = inject(TeacherService);
  private readonly messageService = inject(MessageService);

  // * Properties
  public profilePictureUrl?: string;

  @Input()
  public teacher?: Teacher;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['teacher']) {
      console.debug('Teacher changed');
      this.teacher = changes['teacher'].currentValue;
      // * Load Profile Picture
      if (this.teacher && this.teacher.id) {
        this.teacherService
          .getTeacherProfilePicture(this.teacher.id)
          .subscribe({
            next: (picture) => {
              console.debug('Profile Picture loaded');
              this.profilePictureUrl = URL.createObjectURL(picture);
            },
            error: (error) => {
              console.error('Error loading profile picture', error);
              // Reset the profile picture URL
              this.profilePictureUrl = undefined;
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                icon: 'pi pi-times',
                detail: error.error.message,
              });
            },
          });
      }
    }
  }
}
