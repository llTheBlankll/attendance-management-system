import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-bulk-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    FileUploadModule,
    TableModule,
  ],
  template: `
    <p-dialog
      header="Add Students in Bulk"
      [(visible)]="visible"
      [style]="{ width: '50rem' }"
      [modal]="true"
    >
      <div class="flex flex-column gap-3">
        <div class="p-field">
          <label for="csvFile" class="font-bold">Upload CSV File</label>
          <p-fileUpload
            id="csvFile"
            mode="basic"
            chooseLabel="Choose CSV"
            accept=".csv"
            [auto]="true"
            (onSelect)="onFileSelect($event)"
            [style]="{ width: '100%' }"
          ></p-fileUpload>
        </div>
        <div class="p-field">
          <label class="font-bold">Preview</label>
          <p-table
            [value]="csvPreview"
            [scrollable]="true"
            scrollHeight="200px"
            styleClass="p-datatable-sm"
          >
            <ng-template pTemplate="header">
              <tr>
                @for (col of csvHeaders; track col) {
                  <th>{{ col }}</th>
                }
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-rowData>
              <tr>
                @for (col of csvHeaders; track col) {
                  <td>{{ rowData[col] }}</td>
                }
              </tr>
            </ng-template>
          </p-table>
        </div>
      </div>
      <ng-template pTemplate="footer">
        <p-button
          icon="pi pi-check"
          (onClick)="bulkAddStudents()"
          label="Add Students"
          styleClass="p-button-text"
        ></p-button>
      </ng-template>
    </p-dialog>
  `,
  providers: [
    MessageService
  ]
})
export class BulkAddDialogComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() addStudents = new EventEmitter<
    { classroom: string; student: number }[]
  >();
  csvPreview: { classroom: string; student: number }[] = [];
  csvHeaders: string[] = ['classroom', 'student'];
  // * Injections
  private readonly messageService = inject(MessageService);

  onFileSelect(event: any) {
    const file = event.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }

    const allowedExtensions = ['.csv', '.xlsx', '.xls', '.ods'];
    const fileExtension = file.name
      .substring(file.name.lastIndexOf('.'))
      .toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      console.error(
        'Invalid file type. Please upload a CSV or spreadsheet file.'
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && typeof e.target.result === 'string') {
        const content = e.target.result;
        const lines = content.split('\n');
        if (lines.length < 2) {
          console.error('File is empty or has no data rows');
          return;
        }
        this.csvHeaders = ['classroom', 'student'];
        this.csvPreview = lines
          .slice(1, 6)
          .map((line: string) => {
            const [classroom, studentStr] = line.split(',');
            const student = Number(studentStr);
            return {classroom: classroom.trim(), student};
          })
          .filter(
            ({classroom, student}) => classroom !== '' && !isNaN(student)
          );
        this.messageService.add({
          severity: 'info',
          summary: 'File Preview',
          detail: `Opened file with ${lines.length - 1} rows`,
        });
      } else {
        console.error('Failed to read file');
      }
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
    reader.readAsText(file);
  }

  bulkAddStudents() {
    this.addStudents.emit(this.csvPreview);
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
