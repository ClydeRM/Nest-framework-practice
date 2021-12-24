import { Controller, Get, Post, Put } from '@nestjs/common'; // base controller class from nest

// @decorator define basic controller,
// params is controller name,
// meaning all route start with "/students"
@Controller('students')
export class StudentController {
  @Get() // @decorator define requests method type
  getStudents() {
    return 'All Students';
  }

  @Get('/:studentId')
  getStudentById() {
    return 'Get student by id';
  }

  @Post()
  createStudent() {
    return 'Create student';
  }

  @Put('/:studentId')
  updateStudentById() {
    return 'Update student by id';
  }
}
