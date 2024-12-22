import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {FileSelectEvent, FileUploadModule} from 'primeng/fileupload';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {AuthenticationService} from '../../../../auth/authentication.service';
import {User} from '../../../../core/types/dto/user/user';
import {environment} from '../../../../../environments/environment';
import {TeacherService} from "../../../../core/services/teacher/teacher.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageDTO} from "../../../../core/types/other/MessageDTO";

interface ProfileUpload {
  display: boolean;
  file: File | null;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    FileUploadModule,
    ButtonModule,
    ToastModule,
    InputMaskModule,
    AvatarModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {

  protected readonly API_URL = environment.apiUrl;

  userForm!: FormGroup;
  teacherForm!: FormGroup;
  currentUser!: User;
  sexOptions = ['Male', 'Female', 'Other'];
  positionOptions = [
    'Teacher I',
    'Teacher II',
    'Teacher III',
    'Teacher IV',
    'Teacher V',
    'Master Teacher I',
    'Master Teacher II',
    'Master Teacher III',
    'Master Teacher IV',
    'Head Teacher I',
    'Head Teacher II',
    'Head Teacher III',
    'Principal I',
    'Principal II',
    'Principal III',
  ];
  protected profileUpload: ProfileUpload = {
    display: true,
    file: null
  };
  protected profilePicture?: string;
  // * INJECTIONS
  private readonly teacherService = inject(TeacherService);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthenticationService);
  private messageService = inject(MessageService);

  protected teacherId?: number;

  ngOnInit() {
    this.loadUserData();
    this.initializeForms();
  }

  initializeForms() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profilePicture: [''],
    });

    this.teacherForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleInitial: ['', [Validators.maxLength(1)]],
      age: ['', [Validators.required, Validators.min(18)]],
      contactNumber: ['', Validators.pattern(/^\+?[0-9]{10,12}$/)],
      emergencyContact: ['', Validators.required],
      sex: ['', Validators.required],
      position: ['', Validators.required],
    });
  }

  loadUserData() {
    this.authService.getCurrentUserAsync().subscribe({
      next: (user: User) => {
        console.debug('Current User data fetched successfully.');
        // Set the profile picture url
        if (user.teacher !== undefined) {
          this.teacherId = user.teacher.id;
          this.profilePicture =
            environment.apiUrl +
            '/uploads/teacher/' +
            user.teacher.id +
            '/profile-picture';
        } else {
          this.profilePicture = '/school-logo.png';
        }

        this.currentUser = user;
        this.userForm.patchValue({
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
        });

        if (user.teacher) {
          this.teacherForm.patchValue({
            firstName: user.teacher.firstName,
            lastName: user.teacher.lastName,
            middleInitial: user.teacher.middleInitial,
            age: user.teacher.age,
            contactNumber: user.teacher.contactNumber,
            emergencyContact: user.teacher.emergencyContact,
            sex: user.teacher.sex,
            position: user.teacher.position,
          });
        }
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load user data',
        });
      },
    });
  }

  onSubmitUserForm() {
    if (this.userForm.valid) {
      const updatedUserInfo = {
        ...this.currentUser,
        ...this.userForm.value,
      };

      // Here you would typically call a service to update the user data
      console.log('Updated user account info:', updatedUserInfo);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Account information updated successfully',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields correctly',
      });
    }
  }

  onSubmitTeacherForm() {
    if (this.teacherForm.valid) {
      const updatedTeacherInfo = {
        ...this.currentUser.teacher,
        ...this.teacherForm.value,
      };

      // Here you would typically call a service to update the teacher data
      console.log('Updated teacher info:', updatedTeacherInfo);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Teacher information updated successfully',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields correctly',
      });
    }
  }

  onProfilePictureSelect(event: FileSelectEvent) {
    // Handle profile picture upload
    // You would typically upload the file to your server here
    const file: File = event.files[0];
    if (file.name !== "") {
      this.profileUpload.display = false;
      this.profileUpload.file = file;
    }

    this.messageService.add({
      severity: 'info',
      summary: 'Picture Selected',
      detail: 'Profile picture was selected',
    });
  }

  uploadProfilePicture() {
    console.debug("Uploading profile picture...");
    this.authService.getCurrentUserAsync().subscribe({
      next: (user: User) => {
        console.debug("User data fetched");
        // Check if user teacher id is null or not assigned, else do not upload.
        if (user.teacher === undefined) {
          console.debug("Teacher is not assigned to this account");
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Teacher is not assigned to this account',
          });
          return;
        }

        if (this.profileUpload.file !== null) {
          this.teacherService.uploadTeacherProfilePicture(user.teacher.id, this.profileUpload.file).subscribe({
            next: (response: MessageDTO) => {
              console.debug(`Profile picture was updated successfully: ${response}`);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: response.message
              });
              this.profileUpload = {
                display: true,
                file: null
              };
            },
            error: (error: HttpErrorResponse) => {
              const message = error.message as unknown as MessageDTO;
              console.error(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: message.message
              });
            }
          })
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No profile picture was selected',
          })
        }
      },
      error: (error: HttpErrorResponse) => {

      }
    });
  }

  // Add this method to get form control
  getFormControl(form: FormGroup, field: string) {
    return form.get(field);
  }
}
