import {Component, inject, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {MenuModule} from 'primeng/menu';
import {TableModule} from 'primeng/table';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {ImageModule} from 'primeng/image';
import {
  ListOfTeachersComponent
} from '../../../../components/dashboard/teachers/cards/list-of-teachers/list-of-teachers.component';
import {
  TeacherAdditionalInformationComponent
} from '../../../../components/dashboard/teachers/cards/teacher-additional-information/teacher-additional-information.component';
import {Teacher} from '../../../../core/types/dto/teacher/Teacher';
import {BreadcrumbService} from '../../../../core/services/breadcrumbs/breadcrumb.service';

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
    ImageModule,
    ListOfTeachersComponent,
    TeacherAdditionalInformationComponent,
  ],
  templateUrl: './admin-teachers.component.html',
  styleUrl: './admin-teachers.component.css',
})
export class AdminTeachersComponent implements OnInit {
  public teachers: Teacher[] = [];
  public teacherSelected?: Teacher;
  // Injections
  private readonly breadcrumbsService = inject(BreadcrumbService);

  ngOnInit() {
  }

  public onTeacherSelect(teacher: Teacher) {
    this.teacherSelected = teacher;
  }
}
