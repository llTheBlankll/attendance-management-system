import {Component} from '@angular/core';
import {CardModule} from "primeng/card";
import {PrimeTemplate} from "primeng/api";
import {TimelineModule} from "primeng/timeline";
import {EventItem} from "../../../../../interfaces/EventItem";

@Component({
  selector: 'classes-today-activities-card',
  standalone: true,
  imports: [
    CardModule,
    PrimeTemplate,
    TimelineModule
  ],
  templateUrl: './class-todays-activities-card.component.html',
  styleUrl: './class-todays-activities-card.component.css'
})
export class ClassTodaysActivitiesCardComponent {

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
