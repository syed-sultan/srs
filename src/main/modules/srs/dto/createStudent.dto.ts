import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  public studentEnrollmentId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  @ApiProperty()
  public studentFirstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  @ApiProperty()
  public studentLastName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty()
  public studentSection: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty()
  public nationality: string;

  public status: string;

  public enrollmentDateTime: Date;
}

export default CreateStudentDto;
