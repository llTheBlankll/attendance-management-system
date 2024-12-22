import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../../../../../../core/types/dto/user/user";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ChipsModule} from "primeng/chips";
import {Button} from "primeng/button";
import {MessageService} from "primeng/api";
import {AnnouncementService} from "../../../../../../../core/services/announcement/announcement.service";
import {Announcement} from "../../../../../../../core/types/dto/announcement/announcement";
import {MessageDTO} from "../../../../../../../core/types/other/MessageDTO";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-create-announcement-dialog',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ChipsModule,
    Button
  ],
  styleUrl: './create-announcement-dialog.component.css',
  template: `
    <p-dialog header="Create new announcement" [(visible)]="visible" styleClass="w-30rem">
      <form [formGroup]="this.announcementForm">
        <div class="field">
          <label for="title">Title</label>
          <input type="text" name="title" formControlName="title" class="w-full" pInputText>
        </div>
        <div class="field">
          <label for="content">Content</label>
          <textarea name="content" id="content" cols="30" rows="10" pInputTextarea formControlName="content"
                    class="w-full"></textarea>
        </div>
      </form>
      <ng-template pTemplate="footer">
        <p-button
          icon="pi pi-times"
          label="Close"
          outlined
          severity="danger"
          styleClass="p-button-text"
          (click)="this.announcementForm.reset(); this.visible = false;"
          raised
        ></p-button>
        <p-button
          icon="pi pi-check"
          label="Save"
          outlined
          severity="success"
          styleClass="p-button-text"
          (click)="this.saveAnnouncement()"
          raised
        ></p-button>
      </ng-template>
    </p-dialog>
  `
})
export class CreateAnnouncementDialogComponent {

  @Input()
  visible: boolean = false

  @Input()
  user?: User;

  @Output()
  savedAnnouncement = new EventEmitter<Announcement>();

  protected announcementForm = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(5)]),
    content: new FormControl("", [Validators.required, Validators.minLength(5)])
  });
  private readonly messageService = inject(MessageService);
  private readonly announcementService = inject(AnnouncementService);

  protected saveAnnouncement() {
    if (!this.announcementForm.valid) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please fill out all required fields."
      });
      return;
    }

    if (this.user !== undefined && this.user.teacher !== null) {
      // * Save announcement
      let announcement = {
        ...this.announcementForm.value,
        user: this.user,
        createdAt: undefined,
        updatedAt: undefined
      } as Announcement;

      this.announcementService.createAnnouncement(announcement).subscribe({
        next: (response: HttpResponse<MessageDTO>) => {
          if (response.status === 200) {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: response.body?.message
            });
            this.announcementForm.reset();
            this.visible = false;
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error(error.message);
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to create announcement. Please try again later."
          });
        }
      });

      // Modify the createdAt and updatedAt fields
      announcement.createdAt = new Date();
      announcement.updatedAt = new Date();
      this.savedAnnouncement.emit(announcement);
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "User not found."
      });
    }
  }
}
