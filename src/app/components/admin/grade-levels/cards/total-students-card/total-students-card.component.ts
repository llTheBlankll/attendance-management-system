import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-total-students-card',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card styleClass="mb-2 shadow-3">
      <div class="flex justify-content-between mb-3">
        <div>
          <span class="block text-500 font-medium mb-3">Total Students</span>
          <div class="text-900 font-medium text-xl">{{ totalStudents }}</div>
        </div>
        <div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width:2.5rem;height:2.5rem">
          <i class="pi pi-users text-purple-500 text-xl"></i>
        </div>
      </div>
    </p-card>
  `,
  styles: []
})
export class TotalStudentsCardComponent {
  @Input() totalStudents: number = 0;
}
