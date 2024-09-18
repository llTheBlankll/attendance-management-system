import {inject, Injectable} from '@angular/core';
import {
  collection,
  collectionCount,
  collectionData, deleteDoc,
  doc,
  Firestore,
  query,
  setDoc,
  where
} from "@angular/fire/firestore";
import {Student} from "../../interfaces/dto/Student";
import {Class} from "../../interfaces/dto/Class";
import {ClassService} from "../class/class.service";
import {Observable} from "rxjs";
import {Guardian} from "../../interfaces/dto/Guardian";
import {getDoc} from "@angular/fire/firestore/lite";

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
   * Deletes a student from the Firestore.
   * @param student The student to delete from the Firestore.
   * @returns A promise that resolves to void if the student was successfully
   * deleted, and rejects otherwise.
   * @remarks This function is called when the user clicks the "Delete Student"
   * button.
   * @summary Deletes a student from the Firestore.
   * @notes The student is deleted by deleting the student document from the
   * Firestore. If the student does not exist, the function returns a rejected
   * promise.
   */
  public deleteStudent(student: Student): Promise<void> {
    const studentDoc = doc(this.firebase, 'students', student.id.toString());
    return deleteDoc(studentDoc);
  }

  /**
   * Get total number of students.
   */
  public getTotalStudents(classroom?: Class): Observable<number> {
    const studentsCollection = query(collection(this.firebase, 'students'),
      ...(classroom ? [where('classroom', '==', this.classService.getClassroom(classroom.id))] : [])
    );
    return collectionCount(studentsCollection);
  }

  public getClassStudents(classroom: Class) {
    const classRef = this.classService.getClassroom(classroom.id);
    const studentsCollection = query(collection(this.firebase, 'students'), where('classroom', '==', classRef));
    return collectionData(studentsCollection);
  }

  public getAllStudents() {
    return collectionData(
      collection(this.firebase, 'students'),
      {idField: 'id'}
    )
  }

  public async getStudentClass(student: Student) {
    const studentRef = await getDoc(doc(this.firebase, 'students', student.id.toString()));
    if (studentRef.exists()) {
      const student = studentRef.data() as Student;
      return getDoc(student.classroom);
    }

    return null;
  }

  public getStudent(student: Student) {
    return doc(this.firebase, "students", student.id);
  }
}
