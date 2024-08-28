import {inject, Injectable} from '@angular/core';
import {
  collection,
  collectionCount,
  collectionData,
  doc,
  Firestore,
  query,
  setDoc,
  where
} from "@angular/fire/firestore";
import {Student} from "../../interfaces/dto/Student";
import {Class} from "../../interfaces/dto/Class";
import {ClassService} from "../class/class.service";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly firebase = inject(Firestore);
  private readonly classService = inject(ClassService);

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

  public getClassStudents(classroom: Class) {
    const classRef = this.classService.getClassroom(classroom.id);
    const studentsCollection = query(collection(this.firebase, 'students'), where('class', '==', classRef));
    return collectionData(studentsCollection);
  }
}
