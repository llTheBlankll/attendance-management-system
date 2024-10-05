import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {InputTextModule} from "primeng/inputtext";
import {Teacher} from "../../../../../interfaces/dto/teacher/Teacher";
import {FirebaseStorageService} from "../../../../../services/storage/firebase-storage.service";
import {LoggingService} from "../../../../../services/logging/logging.service";
import {AvatarModule} from "primeng/avatar";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-teacher-additional-information',
  standalone: true,
  imports: [
    CardModule,
    ImageModule,
    InputTextModule,
    AvatarModule,
    NgOptimizedImage
  ],
  templateUrl: './teacher-additional-information.component.html',
  styleUrl: './teacher-additional-information.component.css'
})
export class TeacherAdditionalInformationComponent implements OnChanges {

  // * Injections
  private readonly storageService = inject(FirebaseStorageService);
  private readonly loggingService = inject(LoggingService);

  @Input()
  public teacher?: Teacher = {} as Teacher;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['teacher']) {
      this.teacher = changes['teacher'].currentValue;
      this.getTeacherProfilePictureURL().then((url) => {
        if (url !== null) {
          this.setTeacherProfilePicture(url);
        }
      })
    }
  }

  public setTeacherProfilePicture(profilePicture: string): void {
    if (this.teacher) {
      this.teacher.photoUrl = profilePicture;
    }
  }

  private async getTeacherProfilePictureURL(): Promise<string | null> {
    if (this.teacher === null || this.teacher === undefined) {
      this.loggingService.info("Teacher not provided");
      return null;
    }
    return await this.storageService.getProfilePicture(this.teacher)
  }
}
