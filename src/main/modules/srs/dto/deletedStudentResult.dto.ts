import { IsString } from 'class-validator';
import { ApiResponseProperty } from '@nestjs/swagger';

export class DeletedStudentResultDto {
  @IsString()
  @ApiResponseProperty()
  public studentEnrollmentId: string;

  @IsString()
  @ApiResponseProperty()
  public remarks: string;
}

export default DeletedStudentResultDto;
