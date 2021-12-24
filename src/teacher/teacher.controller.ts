import { Controller, Get, Post } from '@nestjs/common'; // base controller class from nest

@Controller('teachers')
export class TeacherController {
  @Get() // @decorator define requests method type
  getTeachers() {
    return 'All Teachers';
  }

  @Get('/:teacherId')
  getTeacherById() {
    return 'Get Teacher by id';
  }

  @Post()
  createTeacher() {
    return 'Create Teacher';
  }
}
