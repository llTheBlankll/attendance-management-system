import { Component } from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {ImageModule} from "primeng/image";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    ImageModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
