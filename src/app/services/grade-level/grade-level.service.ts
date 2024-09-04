import {inject, Injectable} from '@angular/core';
import {collection, collectionData, doc, DocumentReference, Firestore, getDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class GradeLevelService {
  // Region: Injections
  private readonly firestore = inject(Firestore)

  // End: Injections

  public getAllGradeLevels() {
    return collectionData(collection(this.firestore, 'grade-levels'), {idField: 'id'})
  }

  public getGradeLevelReferenceById(id: string | undefined) {
    if (id === undefined) {
      return null;
    }

    return doc(this.firestore, 'grade-levels', id)
  }

  public getGradeLevelReferenceByReference(gradeLevel: DocumentReference) {
    return doc(this.firestore, 'grade-levels', gradeLevel.id);
  }

  public getGradeLevelDocByReference(gradeLevel: DocumentReference) {
    return getDoc(doc(this.firestore, 'grade-levels', gradeLevel.id));
  }
}
