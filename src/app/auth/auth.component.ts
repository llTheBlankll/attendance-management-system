import {Component, inject} from '@angular/core';
import {CardModule} from "primeng/card";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {StyleClassModule} from "primeng/styleclass";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {FloatLabelModule} from "primeng/floatlabel";
import {Button} from "primeng/button";
import {SplitterModule} from "primeng/splitter";
import {DividerModule} from "primeng/divider";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Firestore} from "@angular/fire/firestore";
import {Auth, getAuth, signInWithEmailAndPassword} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

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
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  public login() {
    if (this.loginForm.valid) {
      signInWithEmailAndPassword(this.auth, this.loginForm.value.email, this.loginForm.value.password)
        .then((userCredential) => {
          // Signed in
          this.router.navigate(["/dashboard/admin"]);
        })
        .catch((error) => {
          if (!environment.production) {
            console.error(error.code);
            console.error(error.message);
          }

          // Display error
          if (error.code === 'auth/invalid-email') {
            this.messageService.add({severity: 'error', summary: 'Error', detail: `Email '${this.loginForm.value.email}' is not valid`});
          } else if (error.code === 'auth/user-not-found') {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'User not found'});
          } else if (error.code === 'auth/invalid-credential') {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Email or Password is not correct'});
          }
        });
    }
  }
}
