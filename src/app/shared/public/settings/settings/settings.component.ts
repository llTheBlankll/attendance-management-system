import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { AvatarModule } from 'primeng/avatar';
import { MessageService } from 'primeng/api';
import { User } from '../../../../core/interfaces/dto/user/user';
import { AuthenticationService } from '../../../../auth/authentication.service';

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
    AvatarModule
  ],
  providers: [MessageService],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthenticationService);
  private messageService = inject(MessageService);

  userForm!: FormGroup;
  teacherForm!: FormGroup;
  currentUser!: User;

  sexOptions = ['Male', 'Female', 'Other'];
  positionOptions = [
    'Teacher I', 'Teacher II', 'Teacher III', 'Teacher IV', 'Teacher V',
    'Master Teacher I', 'Master Teacher II', 'Master Teacher III', 'Master Teacher IV',
    'Head Teacher I', 'Head Teacher II', 'Head Teacher III',
    'Principal I', 'Principal II', 'Principal III'
  ];

  ngOnInit() {
    this.initializeForms();
    this.loadUserData();
  }

  initializeForms() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profilePicture: ['']
    });

    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleInitial: ['', [Validators.maxLength(1)]],
      age: ['', [Validators.required, Validators.min(18)]],
      contactNumber: ['', Validators.pattern(/^\+?[0-9]{10,12}$/)],
      emergencyContact: ['', Validators.required],
      sex: ['', Validators.required],
      position: ['', Validators.required]
    });
  }

  loadUserData() {
    this.authService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.currentUser = user;
        this.userForm.patchValue({
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture
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
            position: user.teacher.position
          });
        }
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to load user data'});
      }
    });
  }

  onSubmitUserForm() {
    if (this.userForm.valid) {
      const updatedUserInfo = {
        ...this.currentUser,
        ...this.userForm.value
      };

      // Here you would typically call a service to update the user data
      console.log('Updated user account info:', updatedUserInfo);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Account information updated successfully'});
    } else {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please fill all required fields correctly'});
    }
  }

  onSubmitTeacherForm() {
    if (this.teacherForm.valid) {
      const updatedTeacherInfo = {
        ...this.currentUser.teacher,
        ...this.teacherForm.value
      };

      // Here you would typically call a service to update the teacher data
      console.log('Updated teacher info:', updatedTeacherInfo);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Teacher information updated successfully'});
    } else {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please fill all required fields correctly'});
    }
  }

  onProfilePictureUpload(event: any) {
    // Handle profile picture upload
    // You would typically upload the file to your server here
    const file = event.files[0];
    console.log('Profile picture to upload:', file);
    this.messageService.add({severity:'info', summary: 'File Uploaded', detail: 'Profile picture updated'});
  }

  // Add this method to get form control
  getFormControl(form: FormGroup, field: string) {
    return form.get(field);
  }
}
