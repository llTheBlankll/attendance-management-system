import {CommonModule} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TimeRange} from '../../../core/types/other/DateRange';
import {Strand} from '../../../core/types/dto/strand/Strand';
import {LineChartDTO} from '../../../core/types/other/LineChartDTO';
import {StrandService} from '../../../core/services/strand/strand.service';

import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ChartModule} from 'primeng/chart';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TableModule} from 'primeng/table';

import {
  AvgStudentsStrandCardComponent
} from '../../../components/dashboard/strands/cards/avg-students-strand-card/avg-students-strand-card.component';
import {
  MostPopularStrandCardComponent
} from '../../../components/dashboard/strands/cards/most-popular-strand-card/most-popular-strand-card.component';
import {
  TotalStrandsCardComponent
} from '../../../components/dashboard/strands/cards/total-strands-card/total-strands-card.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MessageDTO} from '../../../core/types/other/MessageDTO';
import {HttpErrorResponse} from '@angular/common/http';
import {CodeStatus} from '../../../core/types/enums/CodeStatus';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {
  EditStrandDialogComponent
} from "../../../components/dashboard/strands/dialogs/edit-strand-dialog/edit-strand-dialog.component";
import {
  CreateStrandDialogComponent
} from "../../../components/dashboard/strands/dialogs/create-strand-dialog/create-strand-dialog.component";

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
    ConfirmDialogModule,
    ConfirmPopupModule,
    EditStrandDialogComponent,
    CreateStrandDialogComponent,
  ],
  providers: [
    ConfirmationService
  ]
})
export class StrandsComponent implements OnInit {
  strands: { strand: Strand; studentCount: number }[] = [];
  mostPopularStrand: {
    strandId: number;
    strandName: string;
    studentCount: number;
  } | null = null;

  averageStudentsPerStrand: number = 0;
  strandDistributionData: any;
  strandPopularityData: any;
  chartOptions: any;

  strandSelected?: Strand;

  displayEditStrandDialog: boolean = false;
  displayCreateStrandDialog: boolean = false;

  private readonly strandService = inject(StrandService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

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
          position: 'bottom',
        },
      },
      scales: {
        x: {
          grid: {
            display: false
          },
        },
        y: {
          grid: {
            display: false
          }
        }
      },
    };
  }

  loadStrands() {
    this.strandService.getAllStrandWithStudentCount().subscribe({
      next: (data) => {
        this.strands = data;
        this.updateStrandDistributionChart();
      },
      error: (error) => console.error('Error fetching strands:', error),
    });
  }

  loadMostPopularStrand() {
    this.strandService.getMostPopularStrand().subscribe({
      next: (data) => {
        this.mostPopularStrand = data;
      },
      error: (error) =>
        console.error('Error fetching most popular strand:', error),
    });
  }

  loadAverageStudentsPerStrand() {
    this.strandService.getAverageStudentsPerStrand().subscribe({
      next: (data) => {
        this.averageStudentsPerStrand = data;
      },
      error: (error) =>
        console.error('Error fetching average students per strand:', error),
    });
  }

  loadStrandDistribution() {
    const dateRange: TimeRange = {
      startDate: new Date(new Date().getFullYear(), 0, 1),
      endDate: new Date(),
    };
    this.strandService.getStrandDistribution(dateRange).subscribe({
      next: (data: LineChartDTO) => {
        this.updateStrandPopularityChart(data);
      },
      error: (error) =>
        console.error('Error fetching strand distribution:', error),
    });
  }

  updateStrandDistributionChart() {
    this.strandDistributionData = {
      labels: this.strands.map((s) => s.strand.name),
      datasets: [
        {
          data: this.strands.map((s) => s.studentCount),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
        },
      ],
    };
  }

  updateStrandPopularityChart(data: LineChartDTO) {
    this.strandPopularityData = {
      labels: data.labels,
      datasets: [
        {
          label: 'Number of Students',
          data: data.data,
          fill: false,
          borderColor: '#4bc0c0',
        },
      ],
    };
  }

  editStrand(strand: Strand) {
    console.debug("Edited Strand receievd:", strand);
    if (strand.id !== undefined) {
      this.strandService.update(strand, strand.id).subscribe({
        next: (response) => {
          if (response.status === CodeStatus.OK) {
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Strand successfully updated!"
            });
            // Edit the strands variable to reflect the changes
            const originalStrand = this.strands.find(s => s.strand.id === strand.id);
            if (originalStrand) {
              originalStrand.strand = strand;
              // Replace the original strand with the updated one
              this.strands.splice(this.strands.indexOf(originalStrand), 1, originalStrand);
            }
          } else {
            console.debug(response);
            this.messageService.add({
              severity: "warn",
              summary: "",
              detail: "Failed to update strand."
            });
          }
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.message
          });
        },
        complete: () => {
          this.displayEditStrandDialog = false;
        }
      });
    } else {
      console.debug(strand);
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Cannot edit strand because the strand has no identifier."
      });
    }
  }

  deleteStrand(strand: Strand, event: Event) {
    // Implement delete functionality
    console.log('Delete strand:', strand);
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this strand? Every student assigned to this strand will be unassigned.',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (strand.id !== undefined) {
          this.strandService.delete(strand.id).subscribe({
            next: (response: MessageDTO) => {
              if (response.status === CodeStatus.OK) {
                this.strands = this.strands.filter(val => val.strand.id !== strand.id);
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Strand Deleted',
                  life: 3000
                });
              } else {
                this.messageService.add({
                  severity: 'warning',
                  summary: 'Unsuccessful',
                  detail: response.message,
                  life: 3000
                });
              }
            },
            error: (error: HttpErrorResponse) => {
              console.error(error.message);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.message
              });
            },
            complete: () => {
              this.loadMostPopularStrand();
              this.loadAverageStudentsPerStrand();
              this.loadStrandDistribution();
            }
          });
        }
      }
    })
  }

  createStrand(strand: Strand) {
    const result = this.strandService.create(
      strand
    );
    result.subscribe({
      next: (response: Strand) => {
        if (response) {
          this.strands.push({strand: response, studentCount: 0});
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Strand Created',
            life: 3000
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            error.error.message || 'An error occurred while saving the strand',
        });
      },
      complete: () => {
        this.loadMostPopularStrand();
        this.loadAverageStudentsPerStrand();
        this.loadStrandDistribution();
      }
    });
  }
}
