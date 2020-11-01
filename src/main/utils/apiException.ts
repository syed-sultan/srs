import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
  public code: number;
  public description: string;
  public httpStatus: number;
  constructor(code: number, description: string, httpStatus: number) {
    super(description, httpStatus);
    this.code = code;
    this.description = description;
    this.httpStatus = httpStatus;
  }
}
