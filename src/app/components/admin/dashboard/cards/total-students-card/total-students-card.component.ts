import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { StudentService } from '../../../../../core/services/student/student.service';

@Component({
  selector: 'app-total-students-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './total-students-card.component.html',
  styleUrl: './total-students-card.component.css',
})
export class TotalStudentsCardComponent implements OnInit {
  // Injections
  private readonly studentService: StudentService = inject(StudentService);

  totalStudents = 0;
  ngOnInit(): void {
    // Assign the total number of students
    this.studentService.getTotalStudents().subscribe((total: number) => {
      this.totalStudents = total;
    });
  }
}
