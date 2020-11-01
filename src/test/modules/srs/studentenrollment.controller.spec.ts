import { createMock } from 'ts-auto-mock';
import StudentEnrollmentService from '../../../main/modules/srs/service/studentenrollment.service';
import StudentEnrollmentController from '../../../main/modules/srs/studentenrollment.controller';
import StudentEnrollmentResultDto from '../../../main/modules/srs/dto/studentEnrollmentResult.dto';
import CreateStudentDto from '../../../main/modules/srs/dto/createStudent.dto';
import StudentEnrollmentIdParams from '../../../main/utils/studentEnrollmentIdParams';
import UpdateStudentDto from '../../../main/modules/srs/dto/updateStudent.dto';
import DeletedStudentResultDto from '../../../main/modules/srs/dto/deletedStudentResult.dto';
import DeleteStudentDto from '../../../main/modules/srs/dto/deleteStudent.dto';

describe('StudentEnrollment', () => {
  let studentEnrollmentService: StudentEnrollmentService;
  let studentEnrollmentController: StudentEnrollmentController;
  let studentEnrollmentResultDto: StudentEnrollmentResultDto;
  let allStudents: StudentEnrollmentResultDto[];

  beforeEach(() => {
    studentEnrollmentService = new StudentEnrollmentService(undefined);
    //studentEnrollmentService = createMock<StudentEnrollmentService>();
    studentEnrollmentController = new StudentEnrollmentController(
        studentEnrollmentService,
    );
    const studentEnrollmentResultDto = new StudentEnrollmentResultDto();
    const studentEnrollmentResultDto1 = new StudentEnrollmentResultDto();
    allStudents = [studentEnrollmentResultDto, studentEnrollmentResultDto1];
  });

  it('should return active student enrollments', async () => {
    jest
      .spyOn(studentEnrollmentService, 'getActiveStudents')
      .mockImplementation(() => new Promise((r) => r(allStudents)));
    const result: StudentEnrollmentResultDto[] = await studentEnrollmentController.getActiveStudents(
      undefined,
      undefined,
    );
    expect(studentEnrollmentService.getActiveStudents).toHaveBeenCalled();
    expect(result).toStrictEqual(allStudents);
  });

  it('should return inactive student enrollments', async () => {
    jest
        .spyOn(studentEnrollmentService, 'getInactiveStudents')
        .mockImplementation(() => new Promise((r) => r(allStudents)));
    const result: StudentEnrollmentResultDto[] = await studentEnrollmentController.getInactiveStudents(
        undefined,
        undefined,
    );
    expect(studentEnrollmentService.getInactiveStudents).toHaveBeenCalled();
    expect(result).toStrictEqual(allStudents);
  });

  it('enroll student successfully when valid request body is provided', async () => {
    jest
      .spyOn(studentEnrollmentService, 'studentEnrollment')
      .mockImplementation(
        () => new Promise((r) => r(studentEnrollmentResultDto)),
      );

    const result: StudentEnrollmentResultDto = await studentEnrollmentController.studentEnrollment(
      new CreateStudentDto(),
    );

    expect(studentEnrollmentService.studentEnrollment).toHaveBeenCalled();
    expect(result).toBe(studentEnrollmentResultDto);
  });

  it('should update student information successfully when valid request is provided', async () => {
    jest
      .spyOn(studentEnrollmentService, 'updateStudentRecord')
      .mockImplementation(
        () => new Promise((r) => r(studentEnrollmentResultDto)),
      );

    const result: StudentEnrollmentResultDto = await studentEnrollmentController.updateStudent(
      new UpdateStudentDto(),
    );

    expect(studentEnrollmentService.updateStudentRecord).toHaveBeenCalled();
    expect(result).toBe(studentEnrollmentResultDto);
  });

  it('delete student record successfully when valid request is provided', async () => {
    const deleteStudentDto: DeleteStudentDto = createMock<DeleteStudentDto>();
    const deletedStudentResultDto: DeletedStudentResultDto = createMock<
      DeletedStudentResultDto
    >();
    jest
      .spyOn(studentEnrollmentService, 'deleteStudentRecord')
      .mockImplementation(
        () => new Promise((r) => r(deletedStudentResultDto)),
      );

    const result: DeletedStudentResultDto = await studentEnrollmentController.deleteStudentRecord(
      new StudentEnrollmentIdParams(),
      deleteStudentDto,
    );

    expect(studentEnrollmentService.deleteStudentRecord).toHaveBeenCalled();
    expect(result).toStrictEqual(deletedStudentResultDto);
  });
});
