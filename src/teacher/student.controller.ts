import { Controller, Get, Put, Param, Body } from '@nestjs/common'; // base controller class from nest
import { TeacherResponseDto } from './dto/teacher.dto';
import {
  UpdateStudentDto,
  FindStudentResponseDto,
} from '../student/dto/student.dto';

@Controller('teachers/:teacherId/students')
export class StudentTeacherController {
  @Get()
  getStudents(@Param('teacherId') teacherId: string): FindStudentResponseDto[] {
    // return `Get ${teacherId} teacher's all students`;
  }

  @Put('/:studentId')
  updateStudentTeacherById(
    @Param('teacherId') teacherId: string,
    @Param('studentId') studentId: string,
    @Body() body: UpdateStudentDto,
  ): TeacherResponseDto {
    // return `Update ${teacherId} Teacher's students by id ${studentId} data of ${JSON.stringify(body,)}`;
  }
}
