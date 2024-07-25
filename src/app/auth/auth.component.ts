import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {StyleClassModule} from "primeng/styleclass";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {FloatLabelModule} from "primeng/floatlabel";

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
    FloatLabelModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
}
