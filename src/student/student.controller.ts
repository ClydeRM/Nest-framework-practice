import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common'; // base controller class from nest
import {
  CreateStudentDto,
  FindStudentResponseDto,
  StudentResponseDto,
  UpdateStudentDto,
} from './dto/student.dto';
import { StudentService } from './student.service';

// @decorator define basic controller,
// params is controller name,
// meaning all route start with "/students"
@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get() // @decorator define requests method type
  getStudents(): FindStudentResponseDto[] {
    // return 'All Students';
    return this.studentService.getStudents();
  }

  @Get('/:studentId')
  getStudentById(
    @Param('studentId') studentId: string,
  ): FindStudentResponseDto {
    // console.log(studentId);
    // return `Get student by id ${studentId}`;
    return this.studentService.getStudentById(studentId);
  }

  @Post()
  createStudent(@Body() body: CreateStudentDto): StudentResponseDto {
    // console.log(body);
    // return `Create student ${JSON.stringify(body)}`;
    return this.studentService.createStudent(body);
  }

  @Put('/:studentId')
  updateStudentById(
    @Param('studentId') studentId: string,
    @Body() body: UpdateStudentDto,
  ): StudentResponseDto {
    // return `Update student by id ${studentId} data of ${JSON.stringify(body)}`;
    return this.studentService.updateStudentById(studentId, body);
  }
}
