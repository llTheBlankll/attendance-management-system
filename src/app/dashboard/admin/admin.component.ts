import { Component } from '@angular/core';
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {TopbarComponent} from "../../components/topbar/topbar.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    SidebarComponent,
    TopbarComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
