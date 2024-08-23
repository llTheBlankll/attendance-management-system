import {inject, Injectable} from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  setDoc,
  where
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Teacher} from "../../interfaces/dto/Teacher";
import {LoggingService} from "../logging/logging.service";
import {FirebaseStorageService} from "../storage/firebase-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private readonly firestore = inject(Firestore);
  private readonly loggingService = inject(LoggingService);
  private readonly storageService = inject(FirebaseStorageService);

  /**
   * Returns the total list of teachers.
   *
   */
  public getAllTeachers(): Observable<Teacher[]> {
    const teachersCollection = collection(this.firestore, "teachers");
    return collectionData(teachersCollection, {idField: 'id'});
  }

  public addTeacher(teacher: Teacher): void {
    const teachersCollection = collection(this.firestore, "teachers");
    setDoc(doc(teachersCollection), teacher).catch(error => {
      this.loggingService.error(error);
    });
  }

  public searchTeacherByLastName(lastName: string): Observable<Teacher[]> {
    const teachersCollection = collection(this.firestore, "teachers");
    return collectionData(
      query(
        teachersCollection,
        where("lastName", ">=", lastName),
        where("lastName", "<=", lastName + "\uf8ff"),
      ),
    );
  }

  public async deleteTeacher(teacher: Teacher) {
    const teachersCollection = collection(this.firestore, "teachers");
    const q = query(
      teachersCollection,
      where("firstName", "==", teacher.firstName),
      where("lastName", "==", teacher.lastName),
      where("position", "==", teacher.position)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      // ! Delete the teacher profile picture first
      const status = await this.storageService.deleteTeacherProfilePicture(teacher);
      if (status) {
        const docRef = doc(teachersCollection, querySnapshot.docs[0].id);
        await deleteDoc(docRef);
        return true;
      }
    }

    return false;
  }

  public getTeacherReferenceById(id: string | undefined) {
    if (id === undefined) {
      return null;
    }

    return doc(this.firestore, "teachers", id);
  }
}
