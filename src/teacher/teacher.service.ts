import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { teachers } from '../db';
import {
  CreateTeacherDto,
  FindTeacherResponseDto,
  TeacherResponseDto,
  UpdateTeacherDto,
} from './dto/teacher.dto';

@Injectable()
export class TeacherService {
  private teachers = teachers;
  getTeachers(): FindTeacherResponseDto[] {
    return this.teachers;
  }

  getTeacherById(teacherId: string): FindTeacherResponseDto {
    return this.teachers.find((teacher) => teacher.id === teacherId);
  }

  createTeacher(payload: CreateTeacherDto): TeacherResponseDto {
    // eslint-disable-next-line prefer-const
    let newTeacher = {
      id: uuid(),
      ...payload,
    };
    this.teachers.push(newTeacher);
    return newTeacher;
  }

  updateTeacher(
    teacherId: string,
    payload: UpdateTeacherDto,
  ): TeacherResponseDto {
    let updateTeacher: TeacherResponseDto;

    const updateTeacherList = this.teachers.map((teacher) => {
      if (teacher.id === teacherId) {
        updateTeacher = {
          id: teacherId,
          ...payload,
        };
        return updateTeacher;
      } else return teacher;
    });

    this.teachers = updateTeacherList;
    return updateTeacher;
  }
}
