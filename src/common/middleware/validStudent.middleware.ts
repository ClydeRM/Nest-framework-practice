// Check this Id is belong to the particular Student
import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { students } from '../../db'; // General, these data should be from real DB

@Injectable()
export class ValidStudentMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('ValidStudentMiddleware was called!!');
    const studentId = req.params.studentId;
    const studentExists = students.some((student) => student.id === studentId); // 有 True: 沒有 False
    if (!studentExists) {
      throw new HttpException('Student not found', 404);
    }
    next();
  }
}
