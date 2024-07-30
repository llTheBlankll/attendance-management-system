import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {provideAnimations} from "@angular/platform-browser/animations";
import {PrimeNGConfig} from "primeng/api";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {TopbarComponent} from "./components/topbar/topbar.component";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {AuthComponent} from "./auth/auth.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BreadcrumbModule, SidebarComponent, TopbarComponent, NgTemplateOutlet, NgIf, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private primeNgConfig = inject(PrimeNGConfig);

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
  }

  title = 'attendance-management-system';
  authenticated = true;
}
