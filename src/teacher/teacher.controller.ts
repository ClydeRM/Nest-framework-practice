import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common'; // base controller class from nest
import {
  CreateTeacherDto,
  FindTeacherResponseDto,
  TeacherResponseDto,
  UpdateTeacherDto,
} from './dto/teacher.dto';

@Controller('teachers')
export class TeacherController {
  @Get() // @decorator define requests method type
  getTeachers(): FindTeacherResponseDto[] {
    // return 'All Teachers';
  }

  @Get('/:teacherId')
  getTeacherById(
    @Param('teacherId') teacherId: string,
  ): FindTeacherResponseDto {
    // return `Get Teacher by id ${teacherId}`;
  }

  @Post()
  createTeacher(@Body() body: CreateTeacherDto): TeacherResponseDto {
    // return `Create Teacher with data of ${JSON.stringify(body)}`;
  }

  @Put()
  updateTeacher(
    @Param('teacherId') teacherId: string,
    @Body() body: UpdateTeacherDto,
  ): TeacherResponseDto {
    // TODO: ResponseTeacherDto Data
  }
}
