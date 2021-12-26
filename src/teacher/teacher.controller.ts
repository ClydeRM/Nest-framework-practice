import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common'; // base controller class from nest
import {
  CreateTeacherDto,
  FindTeacherResponseDto,
  TeacherResponseDto,
  UpdateTeacherDto,
} from './dto/teacher.dto';
import { TeacherService } from './teacher.service';

@Controller('teachers')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Get() // @decorator define requests method type
  getTeachers(): FindTeacherResponseDto[] {
    // return 'All Teachers';
    return this.teacherService.getTeachers();
  }

  @Get('/:teacherId')
  getTeacherById(
    @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
  ): FindTeacherResponseDto {
    // return `Get Teacher by id ${teacherId}`;
    return this.teacherService.getTeacherById(teacherId);
  }

  @Post()
  createTeacher(@Body() body: CreateTeacherDto): TeacherResponseDto {
    // return `Create Teacher with data of ${JSON.stringify(body)}`;
    return this.teacherService.createTeacher(body);
  }

  @Put('/:teacherId')
  updateTeacher(
    @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
    @Body() body: UpdateTeacherDto,
  ): TeacherResponseDto {
    return this.teacherService.updateTeacher(teacherId, body);
  }
}
