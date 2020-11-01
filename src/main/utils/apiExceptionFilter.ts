import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ApiException } from './apiException';

@Catch(ApiException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: ApiException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response.status(status).json({
      code: exception.code,
      description: exception.description,
      httpStatus: exception.httpStatus,
    });
  }
}
