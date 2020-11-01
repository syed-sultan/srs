import { IsString } from 'class-validator';

export default class StudentEnrollmentIdParams {
  @IsString()
  studentEnrollmentId: string;
}
