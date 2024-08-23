/**
 * An interface representing a class.
 *
 * @export
 * @interface Class
 * @property {string} id - The ID of the class.
 * @property {string} room - The room where the class is held.
 * @property {string} className - The name of the class.
 * @property {string} photoUrl - The URL of the class photo.
 * @property {string} description - The description of the class.
 * @property {string} schoolYear - The school year the class is for.
 * @property {any} strand - The strand the class belongs to.
 * @property {any} gradeLevel - The grade level the class is for.
 * @property {any} teacher - The teacher teaching the class.
 */
export interface Class {
  id: string;
  room: string;
  className: string;
  photoUrl: string | null;
  description: string;
  schoolYear: string;
  strand: any; // See Strand Interface
  gradeLevel: any; // See GradeLevel Interface
  teacher: any; // See Teacher Interface
  students?: any[]; // ! Can cause circular reference
}
