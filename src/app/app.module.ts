import { Module } from '@nestjs/common';
import { StudentModule } from 'src/student/student.module';
import { TeacherModule } from 'src/teacher/teacher.module';

// List of modules that are installed
@Module({
  imports: [StudentModule, TeacherModule], // Import SubModule
  controllers: [],
  providers: [],
})
export class AppModule {}
