import {IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public studentEnrollmentId: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public studentFirstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public studentLastName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public studentSection: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public nationality: string;
}

export default UpdateStudentDto;
