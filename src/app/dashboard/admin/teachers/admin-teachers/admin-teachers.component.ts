import {Component, inject, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {PanelModule} from "primeng/panel";
import {MenuModule} from "primeng/menu";
import {Firestore} from "@angular/fire/firestore";
import {MenuItem} from "primeng/api";
import {TableModule} from "primeng/table";
import {Teacher} from "../../../../interfaces/dto/Teacher";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {Button} from "primeng/button";
import {ImageModule} from "primeng/image";

@Component({
  selector: 'app-admin-teachers',
  standalone: true,
  imports: [
    CardModule,
    PanelModule,
    MenuModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    Button,
    ImageModule
  ],
  templateUrl: './admin-teachers.component.html',
  styleUrl: './admin-teachers.component.css'
})
export class AdminTeachersComponent implements OnInit {
  // Injections
  private readonly firestore = inject(Firestore);

  // Options
  protected readonly teachersMenu: MenuItem[] = [
    {
      label: "Add Teacher",
      icon: "pi pi-fw pi-plus"
    },
    {
      label: "Remove Teacher",
      icon: "pi pi-fw pi-times"
    }
  ]

  public teachers: Teacher[] = [];

  ngOnInit() {
    this.teachers = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        middleInitial: "M",
        age: 18,
        sex: "Male",
        position: "Teacher",
        contactNumber: "1234567890",
        emergencyContact: "0987654321"
      }
    ]
  }
}
