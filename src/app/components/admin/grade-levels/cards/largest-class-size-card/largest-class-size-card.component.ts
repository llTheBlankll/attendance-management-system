import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-largest-class-size-card',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card styleClass="mb-2 shadow-3">
      <div class="flex justify-content-between mb-3">
        <div>
          <span class="block text-500 font-medium mb-3">Largest Class Size</span>
          <div class="text-900 font-medium text-xl">{{ largestClassSize }}</div>
        </div>
        <div class="flex align-items-center justify-content-center bg-yellow-100 border-round" style="width:2.5rem;height:2.5rem">
          <i class="pi pi-users text-yellow-500 text-xl"></i>
        </div>
      </div>
    </p-card>
  `,
  styles: []
})
export class LargestClassSizeCardComponent {
  @Input() largestClassSize: number = 0;
}
