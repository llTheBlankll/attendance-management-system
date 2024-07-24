import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {NgClass} from "@angular/common";
import {StyleClassModule} from "primeng/styleclass";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CardModule,
    NgClass,
    StyleClassModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
}
