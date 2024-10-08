import {Component, inject, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {PanelModule} from "primeng/panel";
import {MenuModule} from "primeng/menu";
import {Firestore} from "@angular/fire/firestore";
import {TableModule} from "primeng/table";
import {Teacher} from "../../../../interfaces/dto/Teacher";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {Button} from "primeng/button";
import {ImageModule} from "primeng/image";
import {
  ListOfTeachersComponent
} from "../../../../components/admin/teachers/cards/list-of-teachers/list-of-teachers.component";
import {
  TeacherAdditionalInformationComponent
} from "../../../../components/admin/teachers/cards/teacher-additional-information/teacher-additional-information.component";
import {BreadcrumbsService} from "../../../../services/breadcrumbs/breadcrumbs.service";

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
    ImageModule,
    ListOfTeachersComponent,
    TeacherAdditionalInformationComponent
  ],
  templateUrl: './admin-teachers.component.html',
  styleUrl: './admin-teachers.component.css'
})
export class AdminTeachersComponent implements OnInit {

  // Injections
  private readonly firestore = inject(Firestore);
  private readonly breadcrumbsService = inject(BreadcrumbsService);

  public teachers: Teacher[] = [];
  public teacherSelected?: Teacher;

  ngOnInit() {
  }

  public onTeacherSelect(teacher: Teacher) {
    this.teacherSelected = teacher;
  }
}
