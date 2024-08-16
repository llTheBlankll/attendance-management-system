import {Component, inject, OnInit} from '@angular/core';
import {PanelModule} from "primeng/panel";
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {AvatarModule} from "primeng/avatar";
import {Section} from "../../../../interfaces/dto/Section";
import {AuthenticationService} from "../../../../auth/authentication.service";
import {User} from "@angular/fire/auth";
import {Observable} from "rxjs";
import {DropdownModule} from "primeng/dropdown";
import {Button} from "primeng/button";

@Component({
  selector: 'classes-section-selection-card',
  standalone: true,
  imports: [
    PanelModule,
    CardModule,
    ImageModule,
    AvatarModule,
    DropdownModule,
    Button
  ],
  templateUrl: './class-section-selection-card.component.html',
  styleUrl: './class-section-selection-card.component.css'
})
export class ClassSectionSelectionCardComponent implements OnInit {

  // Injections
  private readonly authService = inject(AuthenticationService);

  public currentUser: User | null = null;
  public sectionSelected: Section | null = {
    sectionName: "Albert Einstein",
    gradeLevel: {
      id: 1,
      name: "Grade 1"
    },
    strand: {
      id: 1,
      name: "Science"
    },
    teacher: {
      id: 1,
      firstName: "Albert",
      lastName: "Einstein",
      emergencyContact: "09123456789",
      contactNumber: "09123456789",
      middleInitial: "A",
      sex: "Male",
      age: 100,
      photoUrl: "/albert_einstein.jpg",
      position: "Teacher"
    },
    photoUrl: "/albert_einstein.jpg",
    id: 1,
    room: "Building 2, Room 201",
    students: []
  };
  public sections: Section[] = [];

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    user.subscribe((userRetrieved: User | null) => {
      if (userRetrieved === null) {
        console.error("User is null");
        return;
      }

      this.currentUser = userRetrieved;
      console.log(JSON.stringify(userRetrieved));
    });
  }

  protected onSectionSelected(section: Section) {
    this.sectionSelected = section;
  }
}
