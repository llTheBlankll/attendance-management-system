import {inject, Injectable} from '@angular/core';
import {collection, collectionCount, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {Student} from "../../interfaces/dto/Student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly firebase = inject(Firestore);

  public createStudent(student: Student) {
    const studentDoc = doc(this.firebase, 'students', student.id.toString());
    return setDoc(studentDoc, student);
  }

  public getTotalStudents() {

    const studentsCollection = collection(this.firebase, 'students');
    return collectionCount(studentsCollection);
  }
}
