import {inject, Injectable} from '@angular/core';
import {collection, collectionData, doc, Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class StrandService {

  private readonly fireStore = inject(Firestore);

  public getAllStrands() {
    return collectionData(collection(this.fireStore, 'strands'), {idField: 'id'})
  }

  public getStrandReferenceById(id: string | undefined) {
    if (id === null) {
      return null;
    }

    const strandCollection = collection(this.fireStore, 'strands');
    return doc(strandCollection, id)
  }

}
