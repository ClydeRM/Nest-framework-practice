import { Controller, Get, Put } from '@nestjs/common'; // base controller class from nest

@Controller('teachers/:teacherId/students')
export class StudentTeacherController {
  @Get()
  getStudents() {
    return "Get teacher's all students";
  }

  @Put('/:studentId')
  updateStudentTeacherById() {
    return "Update Teacher's students by id";
  }
}
