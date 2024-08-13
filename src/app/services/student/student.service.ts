import {inject, Injectable} from '@angular/core';
import {collection, collectionCount, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {Student} from "../../interfaces/dto/Student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly firebase = inject(Firestore);

  /**
   * Create a new student.
   *
   * @param student Student that will be created.
   * @returns {Promise<void>}
   */
  public createStudent(student: Student): Promise<void> {
    const studentDoc = doc(this.firebase, 'students', student.id.toString());
    return setDoc(studentDoc, student);
  }

  /**
   * Get total number of students.
   */
  public getTotalStudents() {
    const studentsCollection = collection(this.firebase, 'students');
    return collectionCount(studentsCollection);
  }
}
