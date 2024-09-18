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
  public getAllTeachers() {
    const teachersCollection = collection(this.firestore, "teachers");
    return collectionData(teachersCollection, {idField: 'id'});
  }

  /**
   * Adds a new teacher to the Firestore.
   * @param teacher The teacher to add to the Firestore.
   * @remarks This function is called when the user clicks the "Add Teacher" button.
   * @summary Adds a new teacher to the Firestore.
   * @notes The teacher is created with the values from the addTeacherFormGroup.
   * The teacher is then added to the Firestore and the list of teachers is updated.
   */
  public addTeacher(teacher: Teacher): void {
    const teachersCollection = collection(this.firestore, "teachers");
    setDoc(doc(teachersCollection), teacher).catch(error => {
      this.loggingService.error(error);
    });
  }

  /**
   * Searches for teachers with a last name that starts with the given
   * `lastName`.
   *
   * @param lastName The last name to search for.
   * @returns An observable of teachers with a last name that starts with
   * the given `lastName`.
   */
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

  /**
   * Deletes a teacher from the Firestore.
   * @param teacher The teacher to delete from the Firestore.
   * @returns A promise that resolves to true if the teacher was successfully
   * deleted, and false otherwise.
   * @remarks This function is called when the user clicks the "Delete Teacher"
   * button.
   * @summary Deletes a teacher from the Firestore.
   * @notes The teacher is deleted by first deleting their profile picture, and
   * then deleting the teacher document from the Firestore. If the teacher does
   * not exist, the function returns false.
   */
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

  /**
   * Returns a reference to a teacher document in the Firestore.
   * @param id The ID of the teacher to get a reference to.
   * @returns A reference to the teacher document, or null if the ID is undefined.
   * @remarks This function is used internally by the service to get a reference
   * to a teacher document, and is not intended to be used directly by the
   * application.
   * @summary Returns a reference to a teacher document in the Firestore.
   */
  public getTeacherReferenceById(id: string | undefined) {
    if (id === undefined) {
      return null;
    }

    return doc(this.firestore, "teachers", id);
  }
}
