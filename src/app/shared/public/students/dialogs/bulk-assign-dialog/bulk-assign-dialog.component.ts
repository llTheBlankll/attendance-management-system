import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bulk-assign-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, DropdownModule, MultiSelectModule, FormsModule],
  template: `
    <p-dialog
      header="Bulk Assign Students to Section"
      [(visible)]="visible"
      [modal]="true"
      [contentStyle]="{ overflow: 'visible' }"
      #bulkAssignDialog
    >
      <div class="flex flex-column gap-3">
        <div class="p-field">
          <label for="bulkSection" class="font-bold">Section</label>
          <p-dropdown
            id="bulkSection"
            [options]="sections"
            [(ngModel)]="selectedSection"
            optionLabel="name"
            placeholder="Select a section"
            [style]="{ width: '100%' }"
          ></p-dropdown>
        </div>
        <div class="p-field">
          <label for="studentSelection" class="font-bold">Select Students</label>
          <p-multiSelect
            id="studentSelection"
            [options]="allStudents"
            [(ngModel)]="selectedStudents"
            optionLabel="fullName"
            placeholder="Select students"
            [style]="{ width: '100%' }"
            (onShow)="onMultiSelectShow(bulkAssignDialog)"
            (onHide)="onMultiSelectHide(bulkAssignDialog)"
            [filter]="true"
            [virtualScroll]="true"
            [virtualScrollItemSize]="34"
          >
          </p-multiSelect>
        </div>
      </div>
      <ng-template pTemplate="footer">
        <p-button
          icon="pi pi-check"
          (onClick)="bulkAssignStudentsToSection()"
          label="Assign"
          styleClass="p-button-text"
        ></p-button>
      </ng-template>
    </p-dialog>
  `
})
export class BulkAssignDialogComponent {
  @Input() visible: boolean = false;
  @Input() sections: any[] = [];
  @Input() allStudents: any[] = [];
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() assign = new EventEmitter<{section: any, students: any[]}>();

  selectedSection: any;
  selectedStudents: any[] = [];

  onMultiSelectShow(dialog: any) {
    setTimeout(() => {
      if (dialog) {
        dialog.maximized = true;
      }
    }, 0);
  }

  onMultiSelectHide(dialog: any) {
    setTimeout(() => {
      if (dialog) {
        dialog.maximized = false;
      }
    }, 0);
  }

  bulkAssignStudentsToSection() {
    this.assign.emit({section: this.selectedSection, students: this.selectedStudents});
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}