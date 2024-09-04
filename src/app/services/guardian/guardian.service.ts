import {inject, Injectable} from '@angular/core';
import {doc, DocumentReference, Firestore, getDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class GuardianService {

  // * Injections
  private readonly firestore = inject(Firestore);

  public getGuardianByReference(guardian: DocumentReference) {
    return doc(this.firestore, 'guardians', guardian.id);
  }

  public getGuardianDocByReference(guardian: DocumentReference) {
    return getDoc(doc(this.firestore, 'guardians', guardian.id));
  }
}
