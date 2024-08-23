import {inject, Injectable} from '@angular/core';
import {deleteObject, getDownloadURL, ref, Storage, uploadBytes, UploadResult} from "@angular/fire/storage";
import {Teacher} from "../../interfaces/dto/Teacher";
import {Class} from "../../interfaces/dto/Class";

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  private readonly firebaseStorage = inject(Storage);

  public async uploadProfilePicture(file: File, teacher: Teacher): Promise<UploadResult | null> {
    // ! If the file is not provided, return null.
    if (!file) {
      return null;
    }

    try {
      const profilePictureReference = ref(this.firebaseStorage, `profile-pictures/${teacher.firstName}-${teacher.lastName}-${teacher.position}`);
      return await uploadBytes(profilePictureReference, file);
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  public async getProfilePicture(teacher: Teacher): Promise<null | string> {
    try {
      const profilePictureReference = ref(this.firebaseStorage, `profile-pictures/${teacher.firstName}-${teacher.lastName}-${teacher.position}`);
      return await getDownloadURL(profilePictureReference);
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  public async deleteTeacherProfilePicture(teacher: Teacher): Promise<boolean> {
    try {
      const profilePictureReference = ref(this.firebaseStorage, `profile-pictures/${teacher.firstName}-${teacher.lastName}-${teacher.position}`);
      await deleteObject(profilePictureReference);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public async uploadClassLogo(file: File, classData: Class) {
    // ! If the file is not provided, return null.
    if (!file) {
      return null;
    }

    try {
      const profilePictureReference = ref(this.firebaseStorage, `classes-logo/${classData.className}-${classData.room}-${classData.schoolYear}`);
      return await uploadBytes(profilePictureReference, file);
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  public async getClassPicture(classData: Class) {
    try {
      const profilePictureReference = ref(this.firebaseStorage, `classes-logo/${classData.className}-${classData.room}-${classData.schoolYear}`);
      return await getDownloadURL(profilePictureReference);
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  public async deleteClassProfilePicture(classData: Class) {
    try {
      const profilePictureReference = ref(this.firebaseStorage, `classes-logo/${classData.className}-${classData.id}`);
      await deleteObject(profilePictureReference);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
