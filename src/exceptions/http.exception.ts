import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

// generic exception filter
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // argumentHost: provides info about current req and response
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(500).json({ message: 'Some error occurred' });
  }
}
