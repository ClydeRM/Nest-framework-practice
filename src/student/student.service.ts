// Provider service
import { Injectable } from '@nestjs/common';
import { students } from '../db';
import { v4 as uuid } from 'uuid';
import {
  CreateStudentDto,
  FindStudentResponseDto,
  StudentResponseDto,
  UpdateStudentDto,
} from './dto/student.dto';
import { FindTeacherResponseDto } from 'src/teacher/dto/teacher.dto';

@Injectable() // Mark this class is provider
export class StudentService {
  private students = students;

  getStudents(): FindStudentResponseDto[] {
    return this.students;
  }

  getStudentById(studentId: string): FindStudentResponseDto {
    return this.students.find((student) => student.id === studentId);
  }

  createStudent(payload: CreateStudentDto): StudentResponseDto {
    // eslint-disable-next-line prefer-const
    let newStudent = {
      id: uuid(),
      ...payload,
    };
    this.students.push(newStudent);

    return newStudent;
  }

  updateStudentById(
    studentId: string,
    payload: UpdateStudentDto,
  ): StudentResponseDto {
    let updateStudent: StudentResponseDto;

    const updateStudentList = this.students.map((student) => {
      if (student.id === studentId) {
        updateStudent = {
          id: studentId,
          ...payload,
        };
        return updateStudent;
      } else return student;
    });

    this.students = updateStudentList;
    return updateStudent;
  }

  getStudentsByTeacherId(teacherId: string): FindStudentResponseDto[] {
    return this.students.filter((student) => {
      return student.teacher === teacherId;
    });
  }

  updateStudentTeacherById(
    teacherId: string,
    studentId: string,
  ): StudentResponseDto {
    // eslint-disable-next-line prefer-const
    let updateStudent: UpdateStudentDto;

    const updateStudentList = this.students.map((student) => {
      if (student.id === studentId) {
        updateStudent = {
          ...student,
          teacher: teacherId,
        };
        return updateStudent;
      } else return student;
    });

    this.students = updateStudentList;
    return updateStudent;
  }
}
