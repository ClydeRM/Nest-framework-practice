import { Module } from '@nestjs/common';
import { StudentController } from '../student/student.controller';

// List of modules that are installed
@Module({
  imports: [],
  controllers: [StudentController], // List all controllers we need
})
export class AppModule {}
