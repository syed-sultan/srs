import { ArgumentsHost } from '@nestjs/common';
import { stubInterface } from 'ts-sinon';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { ApiExceptionFilter } from '../../main/utils/apiExceptionFilter';
import { ApiException } from '../../main/utils/apiException';

describe('ApiExceptionFilter', () => {
  it('can catch exception', async () => {
    const filter: ApiExceptionFilter = new ApiExceptionFilter();
    const argHost: ArgumentsHost = stubInterface<ArgumentsHost>();
    const httpArgHost: HttpArgumentsHost = stubInterface<HttpArgumentsHost>();
    const res: Response = stubInterface<Response>();
    const ex: ApiException = new ApiException(1, 'Error', 400);

    let body: any;

    jest.spyOn(argHost, 'switchToHttp').mockImplementation(() => httpArgHost);
    jest.spyOn(httpArgHost, 'getResponse').mockImplementation(() => res);
    jest.spyOn(res, 'status').mockImplementation(() => res);
    jest.spyOn(res, 'json').mockImplementation((obj: any) => {
      body = obj;
      return res;
    });
    filter.catch(ex, argHost);
    console.log(body);
    expect(body.code).toBe(1);
    expect(body.description).toBe('Error');
    expect(body.httpStatus).toBe(400);
  });
});
