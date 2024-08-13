import {Component, Input, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {Teacher} from "../../../../../interfaces/dto/Teacher";

@Component({
  selector: 'app-list-of-teachers',
  standalone: true,
  imports: [
    Button,
    CardModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PrimeTemplate,
    TableModule,
    TooltipModule
  ],
  templateUrl: './list-of-teachers.component.html',
  styleUrl: './list-of-teachers.component.css'
})
export class ListOfTeachersComponent implements OnInit {

  @Input()
  public teachers: Teacher[] = [];

  ngOnInit() {
  }
}
