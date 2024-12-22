import {Component, inject, OnInit} from '@angular/core';
import {PanelModule} from "primeng/panel";
import {ChartModule} from "primeng/chart";
import {MenuModule} from "primeng/menu";
import {CardModule} from "primeng/card";
import {TableModule} from 'primeng/table';
import {AttendanceService} from '../../../../../core/services/attendance/attendance.service';
import {ClassroomRanking} from '../../../../../core/types/dto/classroom/ClassroomRanking';
import {TimeRange} from '../../../../../core/types/other/DateRange';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

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
  rankings: ClassroomRanking[] = [];
  loading = false;
  private readonly attendanceService = inject(AttendanceService);

  ngOnInit() {
    this.loadRankings();
  }

  loadRankings() {
    this.loading = true;
    const today = new Date();
    const dateRange = new TimeRange(today, today);

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
