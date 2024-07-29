import { Component } from '@angular/core';
import {SidebarComponent} from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  public sideBarToggled: boolean = false;
}
