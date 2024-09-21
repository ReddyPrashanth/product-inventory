import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch(HttpException)
export class HttpToRpcExceptionFilter
  implements ExceptionFilter<HttpException>
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const originalError = exception?.getResponse()['error'];
    const originalMessage = exception?.getResponse()['message'];

    const objRpcMessage = {
      statusCode: status,
      description: originalMessage,
      error: originalError,
    };
    return throwError(() => new RpcException(objRpcMessage));
  }
}
