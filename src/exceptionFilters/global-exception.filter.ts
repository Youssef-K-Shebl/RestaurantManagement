import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';
import { Response } from 'express';
import mongoose from 'mongoose';

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let statusCode = 500;
    let message: string | object[] = "Something went wrong";
    
    if(process.env.NODE_ENV === 'development') {
      return this.sencErrorDev(exception, response)
    }
    
    // Handle error if we're in production
    
    if (exception instanceof mongoose.Error.ValidationError) {
      ({ statusCode, message } = this.handleValidationError(exception));
    }
    
    else if(exception instanceof HttpException) {
      ({ statusCode, message } = this.handleHttpError(exception));
    }
    
    else if ('code' in exception && exception.code === 11000) {
      ({ statusCode, message } = this.handleDuplicateValueError(exception));
    }
    
    return response.status(statusCode).json({
      statusCode,
      message,
    });
    
  }
  
  handleValidationError(exception) {
    const errors = Object.keys(exception.errors).map((key) => ({
      field: key,
      message: exception.errors[key].message,
    }));
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: errors 
    }
    
  }
  
  handleHttpError(exception) {
    let validationMessage = exception.message;
      const responseData = exception.getResponse();
      if(typeof responseData === 'object' && responseData !== null) {
        if('message' in responseData) {
            if(Array.isArray(responseData.message)) {
            validationMessage = responseData.message.join(', ')
          } else if(typeof responseData.message === 'string') {
            validationMessage = responseData.message
          }
        }
      }
      return {
        statusCode: exception.getStatus(),
        message: validationMessage
      }
      
  }
  
  handleDuplicateValueError(exception) {
    const keyValue = exception.keyValue;
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return {
      statusCode: HttpStatus.CONFLICT,
      message: `The value '${value}' for '${field}' already exists. Please choose another.`
    }
  }
  
  sencErrorDev(exception: Error | HttpException, response: Response) {
    const statusCode = exception instanceof HttpException ? exception.getStatus() : 500
    response.status(statusCode).json({
      error:exception,
      message: exception.message,
      stack: exception.stack
    });
  }
}
