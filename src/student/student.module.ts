import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ValidStudentMiddleware } from '../common/middleware/validStudent.middleware';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService], // Because TeacherModule need this Provider
})

// 此模組若要使用Middleware，需要實作NestModule
export class StudentModule implements NestModule {
  // 定義Middleware
  configure(consumer: MiddlewareConsumer) {
    // Get student by id
    consumer.apply(ValidStudentMiddleware).forRoutes({
      path: 'students/:studentId',
      method: RequestMethod.GET,
    });
    // Put student by id
    consumer.apply(ValidStudentMiddleware).forRoutes({
      path: 'students/:studentId',
      method: RequestMethod.PUT,
    });
  }
}
