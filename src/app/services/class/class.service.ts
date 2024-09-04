import {inject, Injectable} from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  setDoc
} from "@angular/fire/firestore";
import {Class} from "../../interfaces/dto/Class";
import {Observable} from "rxjs";
import {LoggingService} from "../logging/logging.service";

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  // * Injections
  private readonly firestore = inject(Firestore);
  private readonly loggingService = inject(LoggingService);

  // * Methods
  /**
   * Returns the total list of classes.
   */
  public getAllClasses(): Observable<Class[]> {
    return collectionData<Class>(collection(this.firestore, 'classes'), {idField: 'id'});
  }

  public createClass(classroom: Class) {
    const classCollection = collection(this.firestore, 'classes');
    return setDoc(doc(classCollection), classroom);
  }

  public async deleteClass(classroom: Class) {
    const classCollection = collection(this.firestore, 'classes');
    this.loggingService.info(`Class deleted: ${classroom.className}`);
    try {
      await deleteDoc(doc(classCollection, classroom.id.toString()));
      return true;
    } catch (error) {
      this.loggingService.error(error);
      return false;
    }
  }

  public getClassroom(id: string) {
    const classCollection = collection(this.firestore, 'classes');
    this.loggingService.info(`Classroom reference sending: ${id}`);
    return doc(classCollection, id);
  }

  public getClassroomReferenceByReference(classroom: DocumentReference) {
    return doc(this.firestore, 'classes', classroom.id)
  }

  public getClassroomDocByReference(classroom: DocumentReference) {
    return getDoc(doc(this.firestore, 'classes', classroom.id));
  }
}
