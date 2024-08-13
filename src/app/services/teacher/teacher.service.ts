import {inject, Injectable} from '@angular/core';
import {collection, collectionData, Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private readonly firestore = inject(Firestore);

  /**
   * Returns the total list of teachers.
   *
   */
  public getAllTeachers() {
    const teachersCollection = collection(this.firestore, "teachers");
    return collectionData(teachersCollection);
  }

}
