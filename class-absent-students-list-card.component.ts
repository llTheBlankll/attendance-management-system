import { Sex } from './sex.enum';

get maleAbsentCount(): number {
  return this.absentStudents?.filter(s => s.sex === Sex.MALE).length ?? 0;
}

get femaleAbsentCount(): number {
  return this.absentStudents?.filter(s => s.sex === Sex.FEMALE).length ?? 0;
}
