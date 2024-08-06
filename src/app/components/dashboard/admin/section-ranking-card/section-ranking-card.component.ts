import { Component } from '@angular/core';
import {PanelModule} from "primeng/panel";
import {ChartModule} from "primeng/chart";
import {MenuModule} from "primeng/menu";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-section-ranking-card',
  standalone: true,
  imports: [
    PanelModule,
    ChartModule,
    MenuModule,
    CardModule
  ],
  templateUrl: './section-ranking-card.component.html',
  styleUrl: './section-ranking-card.component.css'
})
export class SectionRankingCardComponent {
}
