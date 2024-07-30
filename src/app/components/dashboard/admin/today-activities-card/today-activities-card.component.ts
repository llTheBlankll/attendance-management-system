import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {TimelineModule} from "primeng/timeline";
import {EventItem} from "../../../../interfaces/event-item";

@Component({
  selector: 'app-today-activities-card',
  standalone: true,
  imports: [
    CardModule,
    TimelineModule
  ],
  templateUrl: './today-activities-card.component.html',
  styleUrl: './today-activities-card.component.css'
})
export class TodayActivitiesCardComponent {

  activities: EventItem[] = [
    {
      status: 'Vince Angelo Batecan Logged in',
      date: '2022-11-01',
      icon: 'pi pi-check',
      color: '#9CCC65'
    },
    {
      status: 'Vince Angelo Batecan Logged in',
      date: '2022-11-01',
      icon: 'pi pi-clock',
      color: '#FF9800'
    },
    {
      status: 'Vince Angelo Batecan Logged in',
      date: '2022-11-01',
      icon: 'pi pi-check',
      color: '#9CCC65'
    },
    {
      status: 'Vince Angelo Batecan Logged in',
      date: '2022-11-01',
      icon: 'pi pi-check',
      color: '#9CCC65'
    },
    {
      status: 'Vince Angelo Batecan Logged in',
      date: '2022-11-01',
      icon: 'pi pi-check',
      color: '#9CCC65'
    },
    {
      status: 'Vince Angelo Batecan Logged in',
      date: '2022-11-01',
      icon: 'pi pi-check',
      color: '#9CCC65'
    },
    {
      status: 'Vince Angelo Batecan Logged in',
      date: '2022-11-01',
      icon: 'pi pi-check',
      color: '#9CCC65'
    }
  ]
}
