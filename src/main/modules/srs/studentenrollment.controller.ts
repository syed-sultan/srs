import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiExceptionFilter } from '../../utils/apiExceptionFilter';
import {
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import CreateStudentDto from './dto/createStudent.dto';
import StudentEnrollmentResultDto from './dto/studentEnrollmentResult.dto';
import StudentEnrollmentService from './service/studentenrollment.service';
import UpdateStudentDto from './dto/updateStudent.dto';
import StudentEnrollmentIdParams from '../../utils/studentEnrollmentIdParams';
import DeletedStudentResultDto from './dto/deletedStudentResult.dto';
import DeleteStudentDto from './dto/deleteStudent.dto';

@Controller('student')
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(new ApiExceptionFilter())
export default class StudentEnrollmentController {
  constructor(
    private readonly studentEnrollmentService: StudentEnrollmentService,
  ) {}

  @Get()
  @ApiQuery({ name: 'studentEnrollmentId', type: String, required: false })
  @ApiQuery({ name: 'studentSection', type: String, required: false })
  @ApiOkResponse({
    type: StudentEnrollmentResultDto,
    isArray: true,
    description: 'Get All the Students Information',
  })
  async getStudents(
    @Query('studentEnrollmentId') enrollmentId: string,
    @Query('studentSection') section: string,
  ): Promise<StudentEnrollmentResultDto[]> {
    return this.studentEnrollmentService.getStudents(enrollmentId, section);
  }

  @Post('enrollment')
  @ApiBody({ type: CreateStudentDto })
  @ApiCreatedResponse({
    type: StudentEnrollmentResultDto,
    isArray: false,
    description: 'Student Enrollment',
  })
  async studentEnrollment(
    @Body() enrollment: CreateStudentDto,
  ): Promise<StudentEnrollmentResultDto> {
    return this.studentEnrollmentService.studentEnrollment(enrollment);
  }

  @Put('enrollment/:studentEnrollmentId')
  @ApiBody({ type: UpdateStudentDto })
  @ApiOkResponse({
    type: StudentEnrollmentResultDto,
    description: 'Update Student Information',
  })
  async updateStudent(
    @Body() updateStudent: UpdateStudentDto,
  ): Promise<StudentEnrollmentResultDto> {
    return this.studentEnrollmentService.updateStudentRecord(updateStudent);
  }

  @Patch('enrollment/:studentEnrollmentId')
  @ApiParam({ name: 'studentEnrollmentId', type: 'string' })
  @ApiOkResponse({
    type: DeletedStudentResultDto,
    description: 'Delete Student',
  })
  async deleteStudentRecord(
    @Param() { studentEnrollmentId }: StudentEnrollmentIdParams,
    @Body() deleteStudentDto: DeleteStudentDto,
  ): Promise<DeletedStudentResultDto> {
    return this.studentEnrollmentService.deleteStudentRecord(
      studentEnrollmentId,
      deleteStudentDto,
    );
  }
}
