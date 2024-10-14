import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentViewDialogComponent } from './student-view-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [StudentViewDialogComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ImageModule
  ],
  exports: [StudentViewDialogComponent]
})
export class StudentViewDialogModule { }

