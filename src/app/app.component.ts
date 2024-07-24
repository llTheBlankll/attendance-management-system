import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {provideAnimations} from "@angular/platform-browser/animations";
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private primeNgConfig = inject(PrimeNGConfig);

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
  }

  title = 'attendance-management-system';
}
