import { Controller, Get, Put, Param, ParseUUIDPipe } from '@nestjs/common'; // base controller class from nest
import {
  FindStudentResponseDto,
  StudentResponseDto,
} from '../student/dto/student.dto';
import { StudentService } from '../student/student.service';

@Controller('teachers/:teacherId/students')
export class StudentTeacherController {
  constructor(private studentsService: StudentService) {}

  @Get()
  getStudents(
    @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
  ): FindStudentResponseDto[] {
    // return `Get ${teacherId} teacher's all students`;
    return this.studentsService.getStudentsByTeacherId(teacherId);
  }

  @Put('/:studentId')
  updateStudentTeacherById(
    @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
    @Param('studentId', new ParseUUIDPipe()) studentId: string,
  ): StudentResponseDto {
    // return `Update ${teacherId} Teacher's students by id ${studentId} data of ${JSON.stringify(body,)}`;
    return this.studentsService.updateStudentTeacherById(teacherId, studentId);
  }
}
