import { IsDate, IsString } from 'class-validator';
import { ApiResponseProperty } from '@nestjs/swagger';

export class StudentEnrollmentResultDto {
  public id: string;

  @IsString()
  @ApiResponseProperty()
  public studentEnrollmentId: string;

  @IsString()
  @ApiResponseProperty()
  public studentFirstName: string;

  @IsString()
  @ApiResponseProperty()
  public studentLastName: string;

  @IsString()
  @ApiResponseProperty()
  public studentSection: string;

  @IsString()
  @ApiResponseProperty()
  public nationality: string;

  @IsString()
  @ApiResponseProperty()
  public status: string;

  public remarks: string;

  public updateDateTime: Date;

  @IsDate()
  @ApiResponseProperty()
  public enrollmentDateTime: Date;
}

export default StudentEnrollmentResultDto;
