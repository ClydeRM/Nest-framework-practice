import { Student } from '../../student/dto/student.dto';

export class Teacher {
  id: string;
  name: string;
  students?: Student[];
}

export class FindTeacherResponseDto extends Teacher {}

export class TeacherResponseDto extends Teacher {}

export class CreateTeacherDto extends Teacher {}

export class UpdateTeacherDto {
  name: string;
}
