import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MessageService, PrimeTemplate} from "primeng/api";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Strand} from "../../../../../core/types/dto/strand/Strand";
import {Button} from "primeng/button";

@Component({
  selector: 'app-edit-strand-dialog',
  standalone: true,
  imports: [
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    PrimeTemplate,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './edit-strand-dialog.component.html',
  styleUrl: './edit-strand-dialog.component.css'
})
export class EditStrandDialogComponent implements OnChanges {

  // Injections
  private readonly messageService = inject(MessageService)

  @Input()
  visible = false;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  @Input()
  strand?: Strand

  @Output()
  editedStrand = new EventEmitter<Strand>()

  protected strandForm = new FormGroup({
    name: new FormControl((this.strand && this.strand.name) || '', [Validators.required, Validators.maxLength(255)]),
    description: new FormControl((this.strand && this.strand.description) || '', [Validators.required, Validators.maxLength(65535)])
  })

  public submit() {
    // Checks if the strand is valid but has no id
    if (this.strand !== undefined && this.strand.id === undefined) {
      console.debug(this.strand);
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Invalid Strand was selected."
      });
      return;
    }

    if (this.strandForm.valid) {
      console.debug("Submitted Strand:", this.strandForm.value);
      this.editedStrand.emit({
        ...this.strandForm.value,
        id: this.strand?.id
      } as Strand);
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please fill in all required fields"
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["strand"]) {
      this.strandForm.setValue({
        name: this.strand?.name || '',
        description: this.strand?.description || ''
      });
    }
  }
}
