import 'automapper-ts/dist/automapper';

import StudentEnrollmentService from '../../../../main/modules/srs/service/studentenrollment.service';
import StudentEnrollmentRepository from '../../../../main/modules/srs/repository/studentenrollment.repository';
import StudentEnrollment from '../../../../main/modules/srs/entity/studentenrollment.entity';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import CreateStudentDto from '../../../../main/modules/srs/dto/createStudent.dto';
import StudentEnrollmentResultDto from '../../../../main/modules/srs/dto/studentEnrollmentResult.dto';
import { ApiException } from '../../../../main/utils/apiException';
import { ApiExceptionEnums } from '../../../../main/utils/apiExceptionEnums';
import { HttpStatus } from '@nestjs/common';
import UpdateStudentDto from '../../../../main/modules/srs/dto/updateStudent.dto';
import DeleteStudentDto from '../../../../main/modules/srs/dto/deleteStudent.dto';
import DeletedStudentResultDto from '../../../../main/modules/srs/dto/deletedStudentResult.dto';

describe('StudentEnrollmentService', () => {
  let studentEnrollmentService: StudentEnrollmentService;
  let studentEnrollmentRepository: StudentEnrollmentRepository;
  let studentEnrollments: StudentEnrollment[];
  const enrolment1 = new StudentEnrollment();
  const enrolment2 = new StudentEnrollment();
  const createEnrolment1 = new CreateStudentDto();
  const createEnrolment2 = new CreateStudentDto();

  beforeEach(() => {
    studentEnrollmentRepository = new StudentEnrollmentRepository();
    studentEnrollmentService = new StudentEnrollmentService(
      studentEnrollmentRepository,
    );

    createEnrolment1.studentFirstName = 'AAAA';
    createEnrolment1.studentLastName = 'BBBB';
    createEnrolment1.studentSection = '1A';
    createEnrolment1.status = 'Y';
    createEnrolment1.nationality = 'Madagascar';
    createEnrolment1.enrollmentDateTime = new Date();

    createEnrolment2.studentFirstName = 'XXXXX';
    createEnrolment2.studentLastName = 'YYYYY';
    createEnrolment2.studentSection = '2A';
    createEnrolment2.status = 'Y';
    createEnrolment2.nationality = 'Africa';
    createEnrolment2.enrollmentDateTime = new Date();

    enrolment1.id = uuidv4();
    enrolment1.studentEnrollmentId =
      'S' + moment(new Date()).format('DDMMYYYYhhmmss');
    enrolment1.studentFirstName = createEnrolment1.studentFirstName;
    enrolment1.studentLastName = createEnrolment1.studentLastName;
    enrolment1.studentSection = createEnrolment1.studentSection;
    enrolment1.status = createEnrolment1.status;
    enrolment1.nationality = createEnrolment1.nationality;
    enrolment1.enrollmentDateTime = createEnrolment1.enrollmentDateTime;

    enrolment2.id = uuidv4();
    enrolment2.studentEnrollmentId =
      'S' + moment(new Date()).format('DDMMYYYYhhmmss');
    enrolment2.studentFirstName = createEnrolment2.studentFirstName;
    enrolment2.studentLastName = createEnrolment2.studentLastName;
    enrolment2.studentSection = createEnrolment2.studentSection;
    enrolment2.status = createEnrolment2.status;
    enrolment2.nationality = createEnrolment2.nationality;
    enrolment2.enrollmentDateTime = createEnrolment2.enrollmentDateTime;

    studentEnrollments = [enrolment1, enrolment2];
  });

  it('should enroll student', async () => {
    jest
      .spyOn(studentEnrollmentRepository, 'save')
      .mockImplementation(() => new Promise((r) => r(enrolment1)));

    const result: StudentEnrollmentResultDto = await studentEnrollmentService.studentEnrollment(
      createEnrolment1,
    );
    expect(result.studentEnrollmentId).toEqual(enrolment1.studentEnrollmentId);
    expect(result.studentFirstName).toEqual(enrolment1.studentFirstName);
    expect(result.studentLastName).toEqual(enrolment1.studentLastName);
    expect(result.status).toEqual(enrolment1.status);
    expect(result.nationality).toEqual(enrolment1.nationality);
  });

  it('should not enroll a student if there is an backend exception', async () => {
    jest
      .spyOn(studentEnrollmentRepository, 'save')
      .mockImplementation(() =>
        Promise.reject(
          new ApiException(
            ApiExceptionEnums.INTERNAL_DB_ERROR.getCode(),
            ApiExceptionEnums.INTERNAL_DB_ERROR.getDescription(),
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        ),
      );
    await expect(
      studentEnrollmentService.studentEnrollment(enrolment1),
    ).rejects.toThrow(
      new ApiException(
        ApiExceptionEnums.INTERNAL_DB_ERROR.getCode(),
        ApiExceptionEnums.INTERNAL_DB_ERROR.getDescription(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      ),
    );
  });

  it('should return all the students', async () => {
    jest
      .spyOn(studentEnrollmentRepository, 'find')
      .mockImplementation(() => new Promise((r) => r(studentEnrollments)));

    const result: StudentEnrollmentResultDto[] = await studentEnrollmentService.getActiveStudents(
      undefined,
      undefined,
    );
    expect(studentEnrollmentRepository.find).toHaveBeenCalled();
    expect(result.length).toEqual(2);
  });

  it('should return no records if there are no students', async () => {
    jest
      .spyOn(studentEnrollmentRepository, 'find')
      .mockImplementation(() =>
        Promise.reject(
          new ApiException(
            ApiExceptionEnums.RECORD_NOT_FOUND.getCode(),
            ApiExceptionEnums.RECORD_NOT_FOUND.getDescription(),
            HttpStatus.NOT_FOUND,
          ),
        ),
      );
    await expect(
      studentEnrollmentService.getActiveStudents(
        enrolment1.studentEnrollmentId,
        enrolment1.studentSection,
      ),
    ).rejects.toThrow(
      new ApiException(
        ApiExceptionEnums.RECORD_NOT_FOUND.getCode(),
        ApiExceptionEnums.RECORD_NOT_FOUND.getDescription(),
        HttpStatus.NOT_FOUND,
      ),
    );
  });

  it('should return no records if there are no students', async () => {
    jest
      .spyOn(studentEnrollmentRepository, 'find')
      .mockImplementation(() => new Promise((r) => r([])));
    await expect(
      studentEnrollmentService.getActiveStudents(
        enrolment1.studentEnrollmentId,
        enrolment1.studentSection,
      ),
    ).rejects.toThrow(
      new ApiException(
        ApiExceptionEnums.RECORD_NOT_FOUND.getCode(),
        ApiExceptionEnums.RECORD_NOT_FOUND.getDescription(),
        HttpStatus.NOT_FOUND,
      ),
    );
  });

  it('should return all the inactive students', async () => {
    jest
        .spyOn(studentEnrollmentRepository, 'find')
        .mockImplementation(() => new Promise((r) => r(studentEnrollments)));

    const result: StudentEnrollmentResultDto[] = await studentEnrollmentService.getActiveStudents(
        undefined,
        undefined,
    );
    expect(studentEnrollmentRepository.find).toHaveBeenCalled();
    expect(result.length).toEqual(2);
  });

  it('should return no records if there are no inactive students', async () => {
    jest
        .spyOn(studentEnrollmentRepository, 'find')
        .mockImplementation(() =>
            Promise.reject(
                new ApiException(
                    ApiExceptionEnums.RECORD_NOT_FOUND.getCode(),
                    ApiExceptionEnums.RECORD_NOT_FOUND.getDescription(),
                    HttpStatus.NOT_FOUND,
                ),
            ),
        );
    await expect(
        studentEnrollmentService.getInactiveStudents(
            enrolment1.studentEnrollmentId,
            enrolment1.studentSection,
        ),
    ).rejects.toThrow(
        new ApiException(
            ApiExceptionEnums.RECORD_NOT_FOUND.getCode(),
            ApiExceptionEnums.RECORD_NOT_FOUND.getDescription(),
            HttpStatus.NOT_FOUND,
        ),
    );
  });

  it('should return no records if there are no inactive students', async () => {
    jest
        .spyOn(studentEnrollmentRepository, 'find')
        .mockImplementation(() => new Promise((r) => r([])));
    await expect(
        studentEnrollmentService.getInactiveStudents(
            enrolment1.studentEnrollmentId,
            enrolment1.studentSection,
        ),
    ).rejects.toThrow(
        new ApiException(
            ApiExceptionEnums.RECORD_NOT_FOUND.getCode(),
            ApiExceptionEnums.RECORD_NOT_FOUND.getDescription(),
            HttpStatus.NOT_FOUND,
        ),
    );
  });

  it('should return updated record', async () => {
    jest
      .spyOn(studentEnrollmentRepository, 'findOne')
      .mockImplementation(() => new Promise((r) => r(enrolment1)));

    const updateStudentDto: UpdateStudentDto = new UpdateStudentDto();
    updateStudentDto.studentEnrollmentId = enrolment1.studentEnrollmentId;
    updateStudentDto.studentFirstName = enrolment2.studentFirstName;
    updateStudentDto.studentLastName = enrolment2.studentLastName;
    updateStudentDto.studentSection = enrolment2.studentSection;
    updateStudentDto.nationality = enrolment2.nationality;

    jest
      .spyOn(studentEnrollmentRepository, 'save')
      .mockImplementation(() => new Promise((r) => r(enrolment2)));

    const result: StudentEnrollmentResultDto = await studentEnrollmentService.updateStudentRecord(
      updateStudentDto,
    );

    expect(result.id).toEqual(enrolment2.id);
    expect(result.studentEnrollmentId).toEqual(enrolment2.studentEnrollmentId);
  });

  it('should return not found if student enrollment is not found', async () => {
    const updateStudentDto: UpdateStudentDto = new UpdateStudentDto();
    updateStudentDto.studentEnrollmentId = 'S1231243123123';
    jest
      .spyOn(studentEnrollmentRepository, 'findOne')
      .mockImplementation(() =>
        Promise.reject(
          new ApiException(
            ApiExceptionEnums.RECORD_NOT_FOUND.getCode(),
            ApiExceptionEnums.RECORD_NOT_FOUND.getDescription(),
            HttpStatus.NOT_FOUND,
          ),
        ),
      );
    await expect(
      studentEnrollmentService.updateStudentRecord(updateStudentDto),
    ).rejects.toThrow(
      new ApiException(
        ApiExceptionEnums.RECORD_NOT_FOUND.getCode(),
        ApiExceptionEnums.RECORD_NOT_FOUND.getDescription(),
        HttpStatus.NOT_FOUND,
      ),
    );
  });

  it('should return not found if student enrollment is not found', async () => {
    const updateStudentDto: UpdateStudentDto = new UpdateStudentDto();
    updateStudentDto.studentEnrollmentId = 'S1231243123123';
    jest
      .spyOn(studentEnrollmentRepository, 'findOne')
      .mockImplementation(() => new Promise((r) => r(undefined)));
    await expect(
      studentEnrollmentService.updateStudentRecord(updateStudentDto),
    ).rejects.toThrow(
      new ApiException(
        ApiExceptionEnums.RECORD_NOT_FOUND.getCode(),
        ApiExceptionEnums.RECORD_NOT_FOUND.getDescription() +
          ' - ' +
          updateStudentDto.studentEnrollmentId,
        HttpStatus.NOT_FOUND,
      ),
    );
  });

  it('should return deleted record', async () => {
    jest
      .spyOn(studentEnrollmentRepository, 'findOne')
      .mockImplementation(() => new Promise((r) => r(enrolment1)));

    const deleteStudentDto: DeleteStudentDto = new DeleteStudentDto();

    enrolment2.status = 'N';
    enrolment2.remarks = 'Hello! Please delete this student';
    enrolment2.updateDateTime = new Date();

    deleteStudentDto.remarks = enrolment2.remarks;

    jest
      .spyOn(studentEnrollmentRepository, 'save')
      .mockImplementation(() => new Promise((r) => r(enrolment2)));

    const result: DeletedStudentResultDto = await studentEnrollmentService.deleteStudentRecord(
      enrolment1.studentEnrollmentId,
      deleteStudentDto,
    );

    expect(result.studentEnrollmentId).toEqual(enrolment2.studentEnrollmentId);
    expect(result.remarks).toEqual(deleteStudentDto.remarks);
  });

  it('should return not found if student is not found', async () => {
    jest
      .spyOn(studentEnrollmentRepository, 'findOne')
      .mockImplementation(() =>
        Promise.reject(
          new ApiException(
            ApiExceptionEnums.RECORD_NOT_FOUND.getCode(),
            ApiExceptionEnums.RECORD_NOT_FOUND.getDescription(),
            HttpStatus.NOT_FOUND,
          ),
        ),
      );
    await expect(
      studentEnrollmentService.deleteStudentRecord(
        'S1293994342',
        new DeleteStudentDto(),
      ),
    ).rejects.toThrow(
      new ApiException(
        ApiExceptionEnums.RECORD_NOT_FOUND.getCode(),
        ApiExceptionEnums.RECORD_NOT_FOUND.getDescription(),
        HttpStatus.NOT_FOUND,
      ),
    );
  });

  it('should return not found if student is not found', async () => {
    const id = 'S1293994342';
    jest
      .spyOn(studentEnrollmentRepository, 'findOne')
      .mockImplementation(() => new Promise((r) => r(undefined)));
    await expect(
      studentEnrollmentService.deleteStudentRecord(id, new DeleteStudentDto()),
    ).rejects.toThrow(
      new ApiException(
        ApiExceptionEnums.RECORD_NOT_FOUND.getCode(),
        ApiExceptionEnums.RECORD_NOT_FOUND.getDescription() + ' - ' + id,
        HttpStatus.NOT_FOUND,
      ),
    );
  });
});
