import {Component} from '@angular/core';
import {CardModule} from "primeng/card";
import {PanelModule} from "primeng/panel";
import {MenuModule} from "primeng/menu";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-announcement-card',
  standalone: true,
  imports: [
    CardModule,
    PanelModule,
    MenuModule
  ],
  templateUrl: './announcements-cards.component.html',
  styleUrl: './announcements-cards.component.css'
})
export class AnnouncementsCardsComponent {

  public options: MenuItem[] = [
    {
      label: "Announcements",
      icon: "pi pi-fw pi-list",
      routerLink: ['/dashboard/admin/announcements']
    }
  ]
}
