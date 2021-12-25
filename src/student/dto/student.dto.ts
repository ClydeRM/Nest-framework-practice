export class Student {
  id: string;
  name: string;
  teacher: string;
}

export class FindStudentResponseDto extends Student {}

export class StudentResponseDto extends Student {}

export class CreateStudentDto extends Student {}

export class UpdateStudentDto {
  id: string;
  name: string;
  teacher: string;
}
