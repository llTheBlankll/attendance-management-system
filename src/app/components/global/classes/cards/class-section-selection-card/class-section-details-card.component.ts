import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {PanelModule} from "primeng/panel";
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {AvatarModule} from "primeng/avatar";
import {Class} from "../../../../../interfaces/dto/Class";
import {AuthenticationService} from "../../../../../auth/authentication.service";
import {User} from "@angular/fire/auth";
import {DropdownChangeEvent, DropdownModule} from "primeng/dropdown";
import {Button} from "primeng/button";
import {ClassService} from "../../../../../services/class/class.service";
import {TooltipModule} from "primeng/tooltip";
import {ClassCreateDialogComponent} from "../../dialogs/class-create-dialog/class-create-dialog.component";
import {LoggingService} from "../../../../../services/logging/logging.service";
import {DialogModule} from "primeng/dialog";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

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
    ToastModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
  templateUrl: './class-section-details-card.component.html',
  styleUrl: './class-section-details-card.component.css'
})
export class ClassSectionDetailsCardComponent implements OnInit {

  public currentUser: User | null = null;
  @Output()
  public classSelected = new EventEmitter<Class>();
  @Input()
  public classes?: Class[];
  // The class that is currently selected
  public _class?: Class;
  // Injections
  private readonly authService = inject(AuthenticationService);
  private readonly loggingService = inject(LoggingService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly classService = inject(ClassService);

  ngOnInit() {
    this.retrieveCurrentUser();
  }

  public onClassSelect(event: DropdownChangeEvent) {
    this.loggingService.info(`Class Selected: ${JSON.stringify(event.value)}`);
    this._class = event.value;
    this.classSelected.emit(event.value);
  }

  public retrieveCurrentUser(): void {
    const user = this.authService.getCurrentUser();
    user.subscribe((userRetrieved: User | null) => {
      if (userRetrieved === null) {
        console.error("User is null");
        return;
      }
      this.currentUser = userRetrieved;
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
  public onDeleteClass(event: Event) {
    // * Show Confirmation
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this class?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // ! Delete the class
        if (this._class !== undefined) {
          this.classService.deleteClass(this._class).then(result => {
            // * Check if the deletion was successful
            if (result) {
              this._class = undefined;
              this.classSelected.emit(undefined);
              this.loggingService.info('Class Deleted');
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Class Deleted'
              })
            }
          });
        } else {
          // ! Class is undefined therefore no class to delete
          this.loggingService.info('Class is undefined');
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'Class is undefined'
          });
        }
      },
      reject: () => {
        this.loggingService.info('Delete Canceled');
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Delete Canceled'
        })
      }
    })
  }
}
