import {Component} from '@angular/core';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-weekly-report-card',
  templateUrl: './weekly-report-card.component.html',
  styleUrls: ['./weekly-report-card.component.css'],
  standalone: true,
  imports: [CardModule, ButtonModule, DropdownModule, FormsModule]
})
export class WeeklyReportCardComponent {
  classes: any[] = []; // Populate this with your class data
  selectedClass: any;

  generateReport() {
    // Implement report generation logic
  }
}
