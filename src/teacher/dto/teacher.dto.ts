import { Student } from '../../student/dto/student.dto';

export class Teacher {
  id: string;
  name: string;
  students: Student[];
}

export class FindTeacherResponseDto extends Teacher {
  id: string;
  name: string;
  students: Student[];
}

export class TeacherResponseDto extends Teacher {
  id: string;
  name: string;
  students: Student[];
}

export class CreateTeacherDto extends Teacher {
  id: string;
  name: string;
}

export class UpdateTeacherDto extends Teacher {
  id: string;
  name: string;
}
