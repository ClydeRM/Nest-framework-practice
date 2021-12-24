import { Module } from '@nestjs/common';
import { StudentController } from '../student/student.controller';
import { TeacherController } from '../teacher/teacher.controller';
import { StudentTeacherController } from '../teacher/student.controller';

// List of modules that are installed
@Module({
  imports: [],
  controllers: [StudentController, TeacherController, StudentTeacherController], // List all controllers we need
})
export class AppModule {}
