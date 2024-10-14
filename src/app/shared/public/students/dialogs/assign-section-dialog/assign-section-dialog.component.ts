import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assign-section-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, DropdownModule, FormsModule],
  template: `
    <p-dialog
      header="Assign Student to Section"
      [(visible)]="visible"
      [modal]="true"
      [contentStyle]="{ overflow: 'visible' }"
      #assignSectionDialog
    >
      <div class="flex flex-column gap-2">
        <div class="p-field">
          <label for="section" class="font-bold">Section</label>
          <p-dropdown
            id="section"
            [options]="sections"
            [(ngModel)]="selectedSection"
            optionLabel="name"
            placeholder="Select a section"
            [style]="{ width: '100%' }"
            (onShow)="onDropdownShow(assignSectionDialog)"
            (onHide)="onDropdownHide(assignSectionDialog)"
            [filter]="true"
            [virtualScroll]="true"
            [virtualScrollItemSize]="34"
          ></p-dropdown>
        </div>
      </div>
      <ng-template pTemplate="footer">
        <p-button
          icon="pi pi-check"
          (onClick)="assignStudentToSection()"
          label="Assign"
          styleClass="p-button-text"
        ></p-button>
      </ng-template>
    </p-dialog>
  `
})
export class AssignSectionDialogComponent {
  @Input() visible: boolean = false;
  @Input() sections: any[] = [];
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() assign = new EventEmitter<any>();

  selectedSection: any;

  onDropdownShow(dialog: any) {
    setTimeout(() => {
      if (dialog) {
        dialog.maximized = true;
      }
    }, 0);
  }

  onDropdownHide(dialog: any) {
    setTimeout(() => {
      if (dialog) {
        dialog.maximized = false;
      }
    }, 0);
  }

  assignStudentToSection() {
    this.assign.emit(this.selectedSection);
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
