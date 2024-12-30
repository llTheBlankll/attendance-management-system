import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MessageService, PrimeTemplate} from "primeng/api";
import {Strand} from "../../../../../core/types/dto/strand/Strand";
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'app-create-strand-dialog',
  standalone: true,
  imports: [
    Button,
    DialogModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    PrimeTemplate,
    ReactiveFormsModule
  ],
  templateUrl: './create-strand-dialog.component.html',
  styleUrl: './create-strand-dialog.component.css'
})
export class CreateStrandDialogComponent {

  @Input()
  visible = false;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  @Output()
  createdStrand = new EventEmitter<Strand>()
  strandForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required])
  });

  // Injections
  private readonly messageService = inject(MessageService)

  public submit() {
    if (this.strandForm.valid) {
      this.createdStrand.emit(this.strandForm.value as Strand);
      this.visibleChange.emit(false);
      return;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please fill in all required fields'
    });
  }
}
