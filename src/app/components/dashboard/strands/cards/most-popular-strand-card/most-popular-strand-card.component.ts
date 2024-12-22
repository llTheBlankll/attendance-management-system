import {Component, Input} from '@angular/core';
import {CardModule} from 'primeng/card';

@Component({
  selector: 'app-most-popular-strand-card',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card styleClass="mb-2 shadow-3">
      <div class="flex justify-content-between mb-3">
        <div>
          <span class="block text-500 font-medium mb-3">Most Popular Strand</span>
          <div class="text-900 font-medium text-xl">{{ popularStrand }}</div>
        </div>
        <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width:2.5rem;height:2.5rem">
          <i class="pi pi-star text-orange-500 text-xl"></i>
        </div>
      </div>
    </p-card>
  `,
  styles: []
})
export class MostPopularStrandCardComponent {
  @Input() popularStrand: string = '';
}
