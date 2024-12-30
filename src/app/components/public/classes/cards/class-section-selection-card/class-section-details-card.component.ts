import {HttpErrorResponse} from '@angular/common/http';
import {Component, EventEmitter, inject, Input, OnInit, Output,} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AvatarModule} from 'primeng/avatar';
import {Button} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {DialogModule} from 'primeng/dialog';
import {DropdownChangeEvent, DropdownFilterEvent, DropdownModule,} from 'primeng/dropdown';
import {ImageModule} from 'primeng/image';
import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {AuthenticationService} from '../../../../../auth/authentication.service';
import {ClassroomDTO} from '../../../../../core/types/dto/classroom/ClassroomDTO';
import {User} from '../../../../../core/types/dto/user/user';
import {MessageDTO} from '../../../../../core/types/other/MessageDTO';
import {ClassroomService} from '../../../../../core/services/classroom/classroom.service';
import {ClassCreateDialogComponent} from '../../dialogs/class-create-dialog/class-create-dialog.component';
import {ClassEditDialogComponent} from '../../dialogs/class-edit-dialog/class-edit-dialog.component';

@Component({
  selector: 'classes-class-details-card',
  standalone: true,
  imports: [
    PanelModule,
    CardModule,
    ImageModule,
    AvatarModule,
    DropdownModule,
    Button,
    TooltipModule,
    ClassCreateDialogComponent,
    DialogModule,
    ConfirmPopupModule,
    ToastModule,
    ClassEditDialogComponent
  ],
  providers: [ConfirmationService],
  templateUrl: './class-section-details-card.component.html',
  styleUrl: './class-section-details-card.component.css',
})
export class ClassSectionDetailsCardComponent implements OnInit {
  @Output()
  public classroomSelected = new EventEmitter<ClassroomDTO>();
  @Input()
  public classes?: ClassroomDTO[];
  // The class that is currently selected
  public _classroom?: ClassroomDTO;
  protected currentUser?: User;
  protected classroomProfilePictureUrl?: string;
  // Injections
  private readonly authService = inject(AuthenticationService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly classroomService = inject(ClassroomService);
  private debounceTimeout: any;

  ngOnInit(): void {
    this.authService.getCurrentUserAsync().subscribe({
      next: (user: User) => {
        if (user == null) {
          console.error('Not Logged!');
          return;
        }

        this.currentUser = user;
      },
      error: (error: HttpErrorResponse) => {
        const messageDTO: MessageDTO = error.message as unknown as MessageDTO;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: messageDTO.message,
        });
      },
    });
  }

  public onClassSelect(event: DropdownChangeEvent) {
    this._classroom = event.value;
    this.classroomSelected.emit(event.value);
    this.classroomService.getClassroomProfilePicture(event.value.id).subscribe({
      next: (picture) => {
        this.classroomProfilePictureUrl = URL.createObjectURL(picture);
      },
      error: (error) => {
        // Reset the profile picture url
        this.classroomProfilePictureUrl = undefined;
        console.error(error);
      },
    });
  }

  /**
   * Deletes a class and handles the confirmation dialog as well as the deletion
   * request to the class service.
   *
   * @param {Event} event - The event that triggered the deletion. The target property
   * is used to set the target of the confirmation dialog.
   * @returns {void}
   */
  public onDeleteClass(event: Event): void {
    // * Show Confirmation
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this class?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // ! Delete the class
        if (this._classroom !== undefined && this._classroom.id !== undefined) {
          this.classroomService.deleteClassroom(this._classroom.id).subscribe({
            next: (result) => {
              // * Check if the deletion was successful
              if (result) {
                this._classroom = undefined;
                this.classroomSelected.emit(undefined);
                console.debug(result.message);
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Class Deleted',
                });
              }
            },
            error: (error: HttpErrorResponse) => {
              console.error(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `Failed to delete class\n${error.error}`,
              });
            },
          });
        } else {
          // ! Class is undefined therefore no class to delete
          console.debug('Class is undefined');
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'Class is undefined',
          });
        }
      },
      reject: () => {
        console.debug('Delete Canceled');
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Delete Canceled',
        });
      },
    });
  }

  protected onClassroomFilter(event: DropdownFilterEvent) {
    const classroomNameSearch = event.filter as string;
    if (classroomNameSearch === '') {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.classroomService.listAll().subscribe({
          next: (classes) => {
            this.classes = classes;
          },
          error: (error) => {
            console.error(error);
          },
        });
      }, 500); // adjust the delay to your liking
    } else {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.classroomService
          .searchClassroomByName(classroomNameSearch)
          .subscribe({
            next: (classes) => {
              this.classes = classes;
            },
            error: (error) => {
              console.error(error);
            },
          });
      }, 500); // adjust the delay to your liking
    }
  }
}
