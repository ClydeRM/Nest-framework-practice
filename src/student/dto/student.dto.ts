export class Student {
  id: string;
  name: string;
  teacher: string;
}

export class FindStudentResponseDto extends Student {
  id: string;
  name: string;
  teacher: string;
}

export class StudentResponseDto extends Student {
  id: string;
  name: string;
  teacher: string;
}

export class CreateStudentDto extends Student {
  id: string;
  name: string;
  teacher: string;
}

export class UpdateStudentDto {
  name: string;
  teacher: string;
}
