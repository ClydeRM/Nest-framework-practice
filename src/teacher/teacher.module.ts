import { Module } from '@nestjs/common';
import { StudentModule } from 'src/student/student.module';
import { StudentTeacherController } from './student.controller';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
  imports: [StudentModule], // Cross-Module to import StudentService Provider
  controllers: [StudentTeacherController, TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
