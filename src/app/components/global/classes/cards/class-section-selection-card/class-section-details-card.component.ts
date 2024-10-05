import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { AvatarModule } from 'primeng/avatar';
import { Classroom } from '../../../../../interfaces/dto/classroom/Classroom';
import { AuthenticationService } from '../../../../../auth/authentication.service';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { Button } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ClassCreateDialogComponent } from '../../dialogs/class-create-dialog/class-create-dialog.component';
import { LoggingService } from '../../../../../services/logging/logging.service';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ClassroomService } from '../../../../../services/classroom/classroom.service';
import { User } from '../../../../../interfaces/dto/user/user';

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
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './class-section-details-card.component.html',
  styleUrl: './class-section-details-card.component.css',
})
export class ClassSectionDetailsCardComponent implements OnInit{
  // Injections
  private readonly authService = inject(AuthenticationService);
  private readonly loggingService = inject(LoggingService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly classService = inject(ClassroomService);

  @Output()
  public classroomSelected = new EventEmitter<Classroom>();

  @Input()
  public classes?: Classroom[];

  // The class that is currently selected
  public _classroom?: Classroom;

  protected currentUser?: User;

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user: User | null) => {
      if (user == null) {
        console.error("Not Logged!");
        return;
      }

      this.currentUser = user;
    });
  }

  public onClassSelect(event: DropdownChangeEvent) {
    this.loggingService.info(`Class Selected: ${JSON.stringify(event.value)}`);
    this._classroom = event.value;
    this.classroomSelected.emit(event.value);
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
          this.classService.deleteClassroom(this._classroom.id).subscribe(
            (result) => {
              // * Check if the deletion was successful
              if (result) {
                this._classroom = undefined;
                this.classroomSelected.emit(undefined);
                this.loggingService.info(result.message);
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Class Deleted',
                });
              }
            },
            (error) => {
              this.loggingService.error(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete class',
              });
            }
          );
        } else {
          // ! Class is undefined therefore no class to delete
          this.loggingService.info('Class is undefined');
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'Class is undefined',
          });
        }
      },
      reject: () => {
        this.loggingService.info('Delete Canceled');
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Delete Canceled',
        });
      },
    });
  }
}
