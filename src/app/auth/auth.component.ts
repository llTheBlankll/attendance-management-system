import { NgClass, NgOptimizedImage } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Button } from "primeng/button";
import { CardModule } from "primeng/card";
import { DividerModule } from "primeng/divider";
import { FloatLabelModule } from "primeng/floatlabel";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { SplitterModule } from "primeng/splitter";
import { StyleClassModule } from "primeng/styleclass";
import { ToastModule } from "primeng/toast";
import { AuthenticationService } from "./authentication.service";
import { JWTInformation } from "../core/interfaces/JWTInformation";
import { MessageDTO } from "../core/interfaces/MessageDTO";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CardModule,
    NgClass,
    StyleClassModule,
    NgOptimizedImage,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FloatLabelModule,
    Button,
    SplitterModule,
    DividerModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  providers: [
    MessageService
  ]
})
export class AuthComponent {

  // Injections
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly authenticationService = inject(AuthenticationService);

  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  public login() {
    if (this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value).subscribe({
          next: (message: JWTInformation) => {
            localStorage.setItem("token", message.rawToken);
            localStorage.setItem("role", message.groups[0]);
            localStorage.setItem("username", message.name);
            // Get Email Address
            message.claims.forEach((claim) => {
              if (claim.name === "email") {
                localStorage.setItem("email", claim.value);
              }
            })
            localStorage.setItem("jwt", JSON.stringify(message));


            this.router.navigate(["/dashboard/admin"]).then(r => console.debug(r));
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Login successful'
            });
          },
          error:
            (error: HttpErrorResponse) => {
              const messageDTO: MessageDTO = error.error as MessageDTO;
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: messageDTO.message
              });
            }
        }
      );
    }
  }
}
