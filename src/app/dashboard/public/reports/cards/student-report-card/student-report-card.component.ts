import {Component} from '@angular/core';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-student-report-card',
  templateUrl: './student-report-card.component.html',
  styleUrls: ['./student-report-card.component.css'],
  standalone: true,
  imports: [CardModule, ButtonModule, AutoCompleteModule, FormsModule]
})
export class StudentReportCardComponent {
  filteredStudents: any[] = [];
  selectedStudent: any;

  filterStudents(event: any) {
    // Implement student filtering logic here
  }

  generateReport() {
    // Implement report generation logic
  }
}
