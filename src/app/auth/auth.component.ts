import { Component } from '@angular/core';
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
    ReactiveFormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  public login() {
    if (this.loginForm.valid) {
    }
  }
}
