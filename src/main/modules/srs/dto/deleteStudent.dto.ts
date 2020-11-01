import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteStudentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public remarks: string;
}

export default DeleteStudentDto;
