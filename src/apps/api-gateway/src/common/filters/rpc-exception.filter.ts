import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

interface IError {
  statusCode: number;
  description: string;
  message: string;
}
@Catch(RpcException)
export class CustomRpcExceptionFilter implements ExceptionFilter<RpcException> {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (typeof error === 'object') {
      const err = error as IError;
      return response.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.description,
        error: err.message,
      });
    }

    if (typeof error === 'string') {
      return response.status(500).json({
        statusCode: 500,
        message: 'Something went wrong.',
        error: 'Internal Server Error',
      });
    }
  }
}
