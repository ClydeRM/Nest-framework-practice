import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common'; // base controller class from nest
import {
  CreateStudentDto,
  FindStudentResponseDto,
  StudentResponseDto,
  UpdateStudentDto,
} from './dto/student.dto';

// @decorator define basic controller,
// params is controller name,
// meaning all route start with "/students"
@Controller('students')
export class StudentController {
  @Get() // @decorator define requests method type
  getStudents(): FindStudentResponseDto[] {
    // return 'All Students';
  }

  @Get('/:studentId')
  getStudentById(
    @Param('studentId') studentId: string,
  ): FindStudentResponseDto {
    // console.log(studentId);
    // return `Get student by id ${studentId}`;
  }

  @Post()
  createStudent(@Body() body: CreateStudentDto): StudentResponseDto {
    // console.log(body);
    // return `Create student ${JSON.stringify(body)}`;
  }

  @Put('/:studentId')
  updateStudentById(
    @Param('studentId') studentId: string,
    @Body() body: UpdateStudentDto,
  ): StudentResponseDto {
    // return `Update student by id ${studentId} data of ${JSON.stringify(body)}`;
  }
}
