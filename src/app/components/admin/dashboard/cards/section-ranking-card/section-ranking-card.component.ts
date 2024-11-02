import { Component, OnInit, inject } from '@angular/core';
import { PanelModule } from "primeng/panel";
import { ChartModule } from "primeng/chart";
import { MenuModule } from "primeng/menu";
import { CardModule } from "primeng/card";
import { TableModule } from 'primeng/table';
import { AttendanceService } from '../../../../../core/services/attendance/attendance.service';
import { ClassroomRanking } from '../../../../../core/interfaces/dto/classroom/ClassroomRanking';
import { DateRange } from '../../../../../core/interfaces/DateRange';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-section-ranking-card',
  standalone: true,
  imports: [
    PanelModule,
    ChartModule,
    MenuModule,
    CardModule,
    TableModule,
    ProgressSpinnerModule
  ],
  templateUrl: './section-ranking-card.component.html',
  styleUrl: './section-ranking-card.component.css'
})
export class SectionRankingCardComponent implements OnInit {
  private readonly attendanceService = inject(AttendanceService);

  rankings: ClassroomRanking[] = [];
  loading = false;

  ngOnInit() {
    this.loadRankings();
  }

  loadRankings() {
    this.loading = true;
    const today = new Date();
    const dateRange = new DateRange(today, today);

    this.attendanceService.getClassroomRanking(dateRange, 10)
      .subscribe({
        next: (data) => {
          this.rankings = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading classroom rankings:', error);
          this.loading = false;
        }
      });
  }
}
