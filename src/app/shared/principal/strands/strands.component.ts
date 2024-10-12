import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import { TotalStrandsCardComponent } from './cards/total-strands-card/total-strands-card.component';
import { MostPopularStrandCardComponent } from './cards/most-popular-strand-card/most-popular-strand-card.component';
import { AvgStudentsStrandCardComponent } from './cards/avg-students-strand-card/avg-students-strand-card.component';
import { NewStrandsCardComponent } from './cards/new-strands-card/new-strands-card.component';

@Component({
  selector: 'app-strands',
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
    TotalStrandsCardComponent,
    MostPopularStrandCardComponent,
    AvgStudentsStrandCardComponent,
    NewStrandsCardComponent
  ],
  templateUrl: './strands.component.html',
  styleUrl: './strands.component.css'
})
export class StrandsComponent implements OnInit {
  strands: any[];
  strand: any;
  strandDialog: boolean;
  submitted: boolean;

  strandDistributionData: any;
  strandPopularityData: any;
  chartOptions: any;

  // New properties for statistics cards
  totalStrandsCount: number = 15;
  mostPopularStrand: string = 'STEM';
  avgStudentsPerStrand: number = 75;
  newStrandsThisYear: number = 3;

  constructor() {
    this.strands = [];
    this.strand = {};
    this.strandDialog = false;
    this.submitted = false;
  }

  ngOnInit() {
    // Initialize chart data and options
    this.initChartData();

    // Mock data for strands (replace with actual data fetching)
    this.strands = [
      { name: 'STEM', description: 'Science, Technology, Engineering, and Mathematics', studentCount: 120 },
      { name: 'HUMSS', description: 'Humanities and Social Sciences', studentCount: 90 },
      { name: 'ABM', description: 'Accountancy, Business and Management', studentCount: 100 },
      // Add more mock data as needed
    ];
  }

  initChartData() {
    this.strandDistributionData = {
      labels: ['STEM', 'HUMSS', 'ABM', 'Others'],
      datasets: [
        {
          data: [300, 200, 250, 150],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }
      ]
    };

    this.strandPopularityData = {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'STEM',
          data: [65, 72, 78, 85, 90],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'HUMSS',
          data: [50, 55, 60, 62, 65],
          fill: false,
          borderColor: '#565656'
        },
        {
          label: 'ABM',
          data: [40, 45, 55, 60, 70],
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

  openNewStrandDialog() {
    this.strand = {};
    this.submitted = false;
    this.strandDialog = true;
  }

  editStrand(strand: any) {
    this.strand = {...strand};
    this.strandDialog = true;
  }

  deleteStrand(strand: any) {
    // Implement delete functionality
    console.log('Delete strand:', strand);
  }

  hideDialog() {
    this.strandDialog = false;
    this.submitted = false;
  }

  saveStrand() {
    this.submitted = true;

    if (this.strand.name.trim()) {
      if (this.strand.id) {
        // Update existing strand
        console.log('Update strand:', this.strand);
      } else {
        // Create new strand
        console.log('Create new strand:', this.strand);
      }

      this.strandDialog = false;
      this.strand = {};
    }
  }
}
