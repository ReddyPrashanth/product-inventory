import { ErrorCodes } from '@libs/enums/error-codes.enum';
import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

interface IError {
  message: string;
  statusCode: number;
}

export class Service {
  handleError(error: any, customErr: IError, force = false) {
    let defErr = {
      message: 'Something went wrong.',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
    if (
      force ||
      [ErrorCodes.ER_DUP_ENTRY, ErrorCodes.ER_NO_REFERENCED_ROW_2].includes(
        error?.code,
      )
    ) {
      defErr = customErr;
    }
    throw new RpcException(defErr);
  }
}
