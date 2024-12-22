import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TotalGradeLevelsCardComponent } from '../../../components/admin/grade-levels/cards/total-grade-levels-card/total-grade-levels-card.component';
import { MostPopulatedGradeCardComponent } from '../../../components/admin/grade-levels/cards/most-populated-grade-card/most-populated-grade-card.component';
import { AvgStudentsGradeCardComponent } from '../../../components/admin/grade-levels/cards/avg-students-grade-card/avg-students-grade-card.component';
import { NewGradeLevelsCardComponent } from '../../../components/admin/grade-levels/cards/new-grade-levels-card/new-grade-levels-card.component';
import { TotalStudentsCardComponent } from '../../../components/admin/grade-levels/cards/total-students-card/total-students-card.component';
import { LargestClassSizeCardComponent } from '../../../components/admin/grade-levels/cards/largest-class-size-card/largest-class-size-card.component';
import { LowestAttendanceGradeCardComponent } from '../../../components/admin/grade-levels/cards/lowest-attendance-grade-card/lowest-attendance-grade-card.component';
import { HighestPerformanceGradeCardComponent } from '../../../components/admin/grade-levels/cards/highest-performance-grade-card/highest-performance-grade-card.component';

@Component({
  selector: 'app-grade-levels',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    ChartModule,
    FormsModule,
    ConfirmDialogModule,
    TotalGradeLevelsCardComponent,
    MostPopulatedGradeCardComponent,
    AvgStudentsGradeCardComponent,
    NewGradeLevelsCardComponent,
    TotalStudentsCardComponent,
    LargestClassSizeCardComponent,
    LowestAttendanceGradeCardComponent,
    HighestPerformanceGradeCardComponent
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './grade-levels.component.html',
  styleUrl: './grade-levels.component.css'
})
export class GradeLevelsComponent implements OnInit {
  gradeLevels: any[];
  gradeLevel: any;
  gradeLevelDialog: boolean;
  submitted: boolean;

  gradeLevelDistributionData: any;
  gradeLevelEnrollmentData: any;
  chartOptions: any;

  // Properties for statistics cards
  totalGradeLevelsCount: number = 6;
  mostPopulatedGrade: string = 'Grade 10';
  avgStudentsPerGrade: number = 150;
  newGradeLevelsThisYear: number = 1;
  totalStudents: number = 0;
  largestClassSize: number = 0;

  lowestAttendanceGrade: string = '';
  lowestAttendanceRate: number = 0;
  highestPerformanceGrade: string = '';
  highestPerformanceScore: number = 0;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.gradeLevels = [];
    this.gradeLevel = {};
    this.gradeLevelDialog = false;
    this.submitted = false;
  }

  ngOnInit() {
    this.initChartData();
    this.loadGradeLevels();
    this.calculateStatistics();
    this.calculateAttendanceStatistics();
    this.calculatePerformanceStatistics();
  }

  initChartData() {
    this.gradeLevelDistributionData = {
      labels: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
      datasets: [
        {
          data: [150, 160, 140, 170, 130, 120],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
        }
      ]
    };

    this.gradeLevelEnrollmentData = {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'Junior High',
          data: [550, 580, 600, 620, 640],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Senior High',
          data: [200, 220, 240, 260, 280],
          fill: false,
          borderColor: '#ff6384'
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

  loadGradeLevels() {
    // Mock data for grade levels (replace with actual data fetching)
    this.gradeLevels = [
      { name: 'Grade 7', description: 'First year of Junior High School', studentCount: 150, largestClass: 35, attendanceRate: 92, averageScore: 78 },
      { name: 'Grade 8', description: 'Second year of Junior High School', studentCount: 160, largestClass: 38, attendanceRate: 94, averageScore: 80 },
      { name: 'Grade 9', description: 'Third year of Junior High School', studentCount: 140, largestClass: 32, attendanceRate: 91, averageScore: 76 },
      { name: 'Grade 10', description: 'Fourth year of Junior High School', studentCount: 170, largestClass: 40, attendanceRate: 93, averageScore: 82 },
      { name: 'Grade 11', description: 'First year of Senior High School', studentCount: 130, largestClass: 30, attendanceRate: 95, averageScore: 84 },
      { name: 'Grade 12', description: 'Second year of Senior High School', studentCount: 120, largestClass: 28, attendanceRate: 96, averageScore: 86 },
    ];
  }

  calculateStatistics() {
    this.totalGradeLevelsCount = this.gradeLevels.length;
    this.largestClassSize = Math.max(...this.gradeLevels.map(grade => grade.largestClass));
    this.mostPopulatedGrade = this.gradeLevels.reduce((prev, current) =>
      (prev.studentCount > current.studentCount) ? prev : current
    ).name;
    this.avgStudentsPerGrade = Math.round(this.gradeLevels.reduce((sum, grade) => sum + grade.studentCount, 0) / this.gradeLevels.length);
  }

  calculateAttendanceStatistics() {
    const lowestAttendanceGradeObj = this.gradeLevels.reduce((prev, current) =>
      (prev.attendanceRate < current.attendanceRate) ? prev : current
    );
    this.lowestAttendanceGrade = lowestAttendanceGradeObj.name;
    this.lowestAttendanceRate = lowestAttendanceGradeObj.attendanceRate;
  }

  calculatePerformanceStatistics() {
    const highestPerformanceGradeObj = this.gradeLevels.reduce((prev, current) =>
      (prev.averageScore > current.averageScore) ? prev : current
    );
    this.highestPerformanceGrade = highestPerformanceGradeObj.name;
    this.highestPerformanceScore = highestPerformanceGradeObj.averageScore;
  }

  openNewGradeLevelDialog() {
    this.gradeLevel = {};
    this.submitted = false;
    this.gradeLevelDialog = true;
  }

  editGradeLevel(gradeLevel: any) {
    this.gradeLevel = {...gradeLevel};
    this.gradeLevelDialog = true;
  }

  deleteGradeLevel(gradeLevel: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this grade level?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Implement delete functionality
        this.gradeLevels = this.gradeLevels.filter(val => val.id !== gradeLevel.id);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Grade Level Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.gradeLevelDialog = false;
    this.submitted = false;
  }

  saveGradeLevel() {
    this.submitted = true;

    if (this.gradeLevel.name.trim()) {
      if (this.gradeLevel.id) {
        // Update existing grade level
        const index = this.gradeLevels.findIndex(gl => gl.id === this.gradeLevel.id);
        this.gradeLevels[index] = this.gradeLevel;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Grade Level Updated', life: 3000});
      } else {
        // Create new grade level
        this.gradeLevel.id = Date.now(); // Simple way to generate a unique id
        this.gradeLevels.push(this.gradeLevel);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Grade Level Created', life: 3000});
      }

      this.gradeLevelDialog = false;
      this.gradeLevel = {};
    }
  }

  // Add a method to export grade level data
  exportGradeLevelData() {
    // Implement logic to export data to CSV or Excel
    console.log('Exporting grade level data...');
    // You can use a library like xlsx to generate the export file
  }

  // Add a method to view detailed grade level report
  viewDetailedReport(gradeLevel: any) {
    console.log('Viewing detailed report for', gradeLevel.name);
    // Implement logic to show a detailed report, possibly in a new dialog or route
  }
}
