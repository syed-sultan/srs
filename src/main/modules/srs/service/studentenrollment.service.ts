import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import 'automapper-ts/dist/automapper';
import * as moment from 'moment';
import { ApiException } from '../../../utils/apiException';
import { ApiExceptionEnums } from '../../../utils/apiExceptionEnums';
import StudentEnrollmentRepository from '../repository/studentenrollment.repository';
import CreateStudentDto from '../dto/createStudent.dto';
import StudentEnrollmentResultDto from '../dto/studentEnrollmentResult.dto';
import StudentEnrollment from '../entity/studentenrollment.entity';
import UpdateStudentDto from '../dto/updateStudent.dto';
import DeletedStudentResultDto from '../dto/deletedStudentResult.dto';
import DeleteStudentDto from '../dto/deleteStudent.dto';

@Injectable()
export default class StudentEnrollmentService {
  public logger: Logger = new Logger(StudentEnrollmentService.name);

  constructor(
    @InjectRepository(StudentEnrollmentRepository)
    private readonly studentEnrollmentRepository: StudentEnrollmentRepository,
  ) {
    automapper
      .createMap('StudentEnrollment', 'StudentEnrollmentResultDto')
      .forMember('id', (opts) => opts.mapFrom('id'))
      .forMember('studentEnrollmentId', (opts) =>
        opts.mapFrom('studentEnrollmentId'),
      )
      .forMember('studentFirstName', (opts) => opts.mapFrom('studentFirstName'))
      .forMember('studentLastName', (opts) => opts.mapFrom('studentLastName'))
      .forMember('studentSection', (opts) => opts.mapFrom('studentSection'))
      .forMember('nationality', (opts) => opts.mapFrom('nationality'))
      .forMember('status', (opts) => opts.mapFrom('status'))
      .forMember('enrollmentDateTime', (opts) =>
        opts.mapFrom('enrollmentDateTime'),
      )
      .ignoreAllNonExisting();

    automapper
      .createMap('StudentEnrollment', 'DeletedStudentResultDto')
      .forMember('studentEnrollmentId', (opts) =>
        opts.mapFrom('studentEnrollmentId'),
      )
      .forMember('remarks', (opts) => opts.mapFrom('remarks'))
      .ignoreAllNonExisting();
  }

  async getStudents(
    studentId: string,
    studentSection: string,
  ): Promise<StudentEnrollmentResultDto[]> {
    this.logger.log('Fetching Students based on criteria - ',+studentId+' | '+studentSection);
    let query = {};

    if (studentId) {
      query = { ...query, studentEnrollmentId: studentId };
    }
    if (studentSection) {
      query = { ...query, studentSection: studentSection };
    }

    query = { ...query, status: 'Y' };
    const students: StudentEnrollmentResultDto[] = await this.studentEnrollmentRepository.find(
      {
        where: query,
      },
    );

    if (!students || students.length === 0) {
      throw new ApiException(
        ApiExceptionEnums.RECORD_NOT_FOUND.getCode(),
        ApiExceptionEnums.RECORD_NOT_FOUND.getDescription(),
        HttpStatus.NOT_FOUND,
      );
    }

    const result: StudentEnrollmentResultDto[] = [];
    for (const eachStudent of students) {
      const eachStudentDto: StudentEnrollmentResultDto = automapper.map(
        'StudentEnrollment',
        'StudentEnrollmentResultDto',
        eachStudent,
      );
      result.push(eachStudentDto);
    }
    this.logger.log('Total No. of Students fetched - '+result.length);
    return result;
  }

  async studentEnrollment(
    student: CreateStudentDto,
  ): Promise<StudentEnrollmentResultDto> {
    this.logger.log('Enrollment for student - ',JSON.stringify(student));
    const studentDate: Date = new Date();
    const studentEnrollmentId = moment(studentDate).format('DDMMYYYYHHmmss');
    student.studentEnrollmentId = 'S' + studentEnrollmentId;
    student.status = 'Y';
    student.enrollmentDateTime = new Date();
    this.logger.log(
      'Student Enrollment Information - ' + JSON.stringify(student),
    );
    let result: StudentEnrollment;
    try {
      result = await this.studentEnrollmentRepository.save(student);
    } catch (error) {
      throw new ApiException(
        ApiExceptionEnums.INTERNAL_DB_ERROR.getCode(),
        ApiExceptionEnums.INTERNAL_DB_ERROR.getDescription(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return automapper.map(
      'StudentEnrollment',
      'StudentEnrollmentResultDto',
      result,
    );
  }

  async updateStudentRecord(
    updateRecord: UpdateStudentDto,
  ): Promise<StudentEnrollmentResultDto> {
    this.logger.log('Performing record update with the student information - '+JSON.stringify(updateRecord));
    const student: StudentEnrollment = await this.studentEnrollmentRepository.findOne(
      { where: { studentEnrollmentId: updateRecord.studentEnrollmentId } },
    );

    if (!student) {
      throw new ApiException(
        ApiExceptionEnums.RECORD_NOT_FOUND.getCode(),
        ApiExceptionEnums.RECORD_NOT_FOUND.getDescription() +
          ' - ' +
          updateRecord.studentEnrollmentId,
        HttpStatus.NOT_FOUND,
      );
    }
    this.logger.log('Updating the record for the student enrollment - '+student.studentEnrollmentId);
    student.studentEnrollmentId = updateRecord.studentEnrollmentId;
    student.studentFirstName = updateRecord.studentFirstName;
    student.studentLastName = updateRecord.studentLastName;
    student.studentSection = updateRecord.studentSection;
    student.nationality = updateRecord.nationality;
    student.updateDateTime = new Date();

    const updatedResult: StudentEnrollment = await this.studentEnrollmentRepository.save(
      student,
    );
    return automapper.map(
      'StudentEnrollment',
      'StudentEnrollmentResultDto',
      updatedResult,
    );
  }

  async deleteStudentRecord(
    id: string,
    deleteStudentDto: DeleteStudentDto,
  ): Promise<DeletedStudentResultDto> {
    this.logger.log('Performing record delete with the student information - '+id+' | '+JSON.stringify(deleteStudentDto));

    const student: StudentEnrollment = await this.studentEnrollmentRepository.findOne(
      { where: { studentEnrollmentId: id } },
    );

    if (!student) {
      throw new ApiException(
        ApiExceptionEnums.RECORD_NOT_FOUND.getCode(),
        ApiExceptionEnums.RECORD_NOT_FOUND.getDescription() + ' - ' + id,
        HttpStatus.NOT_FOUND,
      );
    }
    this.logger.log('Deleting the record for the student enrollment - '+student.studentEnrollmentId);

    student.studentEnrollmentId = id;
    student.status = 'N';
    student.remarks = deleteStudentDto.remarks;
    student.updateDateTime = new Date();

    const deletedResult: StudentEnrollment = await this.studentEnrollmentRepository.save(
      student,
    );
    return automapper.map(
      'StudentEnrollment',
      'DeletedStudentResultDto',
      deletedResult,
    );
  }
}
