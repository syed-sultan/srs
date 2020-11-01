import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public studentEnrollmentId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public studentFirstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public studentLastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public studentSection: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public nationality: string;
}

export default UpdateStudentDto;
