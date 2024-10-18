import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateRange } from '../../../core/interfaces/DateRange';
import { Strand } from '../../../core/interfaces/dto/strand/Strand';
import { LineChartDTO } from '../../../core/interfaces/LineChartDTO';
import { StrandService } from '../../../core/services/strand/strand.service';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';

import { AvgStudentsStrandCardComponent } from '../../../components/admin/strands/cards/avg-students-strand-card/avg-students-strand-card.component';
import { MostPopularStrandCardComponent } from '../../../components/admin/strands/cards/most-popular-strand-card/most-popular-strand-card.component';
import { NewStrandsCardComponent } from '../../../components/admin/strands/cards/new-strands-card/new-strands-card.component';
import { TotalStrandsCardComponent } from '../../../components/admin/strands/cards/total-strands-card/total-strands-card.component';

@Component({
  selector: 'app-strands',
  templateUrl: './strands.component.html',
  styleUrls: ['./strands.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ChartModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    TotalStrandsCardComponent,
    MostPopularStrandCardComponent,
    AvgStudentsStrandCardComponent,
    NewStrandsCardComponent
  ]
})
export class StrandsComponent implements OnInit {
  strands: { strand: Strand; studentCount: number }[] = [];
  mostPopularStrand: { strandId: number; strandName: string; studentCount: number } | null = null;
  averageStudentsPerStrand: number = 0;
  strandDistributionData: any;
  strandPopularityData: any;
  chartOptions: any;
  strandDialog: boolean = false;
  strandSelected: Partial<Strand> = {};
  submitted: boolean = false;

  constructor(private strandService: StrandService) { }

  ngOnInit() {
    this.loadStrands();
    this.loadMostPopularStrand();
    this.loadAverageStudentsPerStrand();
    this.loadStrandDistribution();
    this.initChartOptions();
  }

  initChartOptions() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        }
      },
      scales: {
        x: {
          display: true,
          grid: {
            display: false
          },
          ticks: {
            display: false
          }
        },
        y: {
          display: true,
          beginAtZero: true
        }
      }
    };
  }

  loadStrands() {
    this.strandService.getAllStrandWithStudentCount().subscribe({
      next: (data) => {
        this.strands = data;
        this.updateStrandDistributionChart();
      },
      error: (error) => console.error('Error fetching strands:', error)
    });
  }

  loadMostPopularStrand() {
    this.strandService.getMostPopularStrand().subscribe({
      next: (data) => {
        this.mostPopularStrand = data;
      },
      error: (error) => console.error('Error fetching most popular strand:', error)
    });
  }

  loadAverageStudentsPerStrand() {
    this.strandService.getAverageStudentsPerStrand().subscribe({
      next: (data) => {
        this.averageStudentsPerStrand = data;
      },
      error: (error) => console.error('Error fetching average students per strand:', error)
    });
  }

  loadStrandDistribution() {
    const dateRange: DateRange = {
      startDate: new Date(new Date().getFullYear(), 0, 1),
      endDate: new Date()
    };
    this.strandService.getStrandDistribution(dateRange).subscribe({
      next: (data: LineChartDTO) => {
        this.updateStrandPopularityChart(data);
      },
      error: (error) => console.error('Error fetching strand distribution:', error)
    });
  }

  updateStrandDistributionChart() {
    this.strandDistributionData = {
      labels: this.strands.map(s => s.strand.name),
      datasets: [{
        data: this.strands.map(s => s.studentCount),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
      }]
    };
  }

  updateStrandPopularityChart(data: LineChartDTO) {
    this.strandPopularityData = {
      labels: data.labels,
      datasets: [{
        label: 'Number of Students',
        data: data.data,
        fill: false,
        borderColor: '#4bc0c0'
      }]
    };
  }

  editStrand(strand: { strand: Strand; studentCount: number }) {
    this.strandSelected = { ...strand.strand };
    this.strandDialog = true;
  }

  deleteStrand(strand: { strand: Strand; studentCount: number }) {
    // Implement delete functionality
    console.log('Delete strand:', strand);
  }

  hideDialog() {
    this.strandDialog = false;
    this.submitted = false;
  }

  saveStrand() {
    this.submitted = true;
    // Implement save functionality
    console.log('Save strand:', this.strandSelected);
    this.hideDialog();
  }
}
