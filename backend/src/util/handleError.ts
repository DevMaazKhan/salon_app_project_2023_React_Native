/* eslint-disable no-param-reassign */
import { type Request, type Response, type NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import logger from './logger';
import ErrorResponse, { ErrorResponseType } from './createError';

function handleError(
  error: Error & ErrorResponseType,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let requiredFieldsError = '';
  let numberTypeFieldsError = '';
  let tooSmallFieldError = '';
  let uniqueFieldError = '';
  let recordNotFound = '';
  let customError = '';
  let { statusCode } = res;

  if (error instanceof ZodError) {
    const requiredErrorTypes = error.errors.filter(
      (singleError) => singleError.message === 'Required'
    );

    requiredErrorTypes.forEach((singleError, i) => {
      requiredFieldsError += `[${singleError.path.join('.') ?? ''}]`;
      if (i < requiredErrorTypes.length - 1) {
        requiredFieldsError += ' ';
      }
    });

    if (requiredFieldsError !== '') {
      requiredFieldsError = `${requiredFieldsError
        .split(' ')
        .join(',')} field(s) are Required`;
    }

    const numberTypeErrors = error.errors.filter((singleError) =>
      singleError.message.includes('Expected')
    );

    numberTypeErrors.forEach((singleError, i) => {
      numberTypeFieldsError += `${
        singleError.path.join('.') !== ''
          ? `[${singleError.path.join(
              '.'
            )}] received as ${singleError?.received.toUpperCase()} should be a ${singleError?.expected.toUpperCase()}`
          : ''
      }`;
      if (i < numberTypeErrors.length - 1) {
        numberTypeFieldsError += ', ';
      }
    });

    if (numberTypeFieldsError !== '') {
      numberTypeFieldsError = `${numberTypeFieldsError}`;
    }

    const toSmallFieldErrors = error.errors.filter(
      (singleError) => singleError.code === 'too_small'
    );

    toSmallFieldErrors.forEach((singleError, i) => {
      tooSmallFieldError += `${
        singleError.path.join('.') !== ''
          ? `[${singleError.path.join('.')}] ${singleError.message}`
          : ''
      }`;
      if (i < toSmallFieldErrors.length - 1) {
        tooSmallFieldError += ', ';
      }
    });

    if (tooSmallFieldError !== '') {
      tooSmallFieldError = `${tooSmallFieldError}`;
    }

    statusCode = 422;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    error.name = 'PrismaError';
    if (error.code === 'P2002') {
      uniqueFieldError = `${(error.meta?.target as string[])?.join(
        ','
      )} must be unique`;
    }

    if (error.code === 'P2025') {
      const startIndex = `${(error.meta?.cause as string).indexOf("'")}`;
      const endIndex = `${(error.meta?.cause as string).indexOf(
        "'",
        +startIndex + 1
      )}`;
      const recordName = `${(error.meta?.cause as string).slice(
        +startIndex + 1,
        +endIndex
      )}`;

      recordNotFound = `${recordName} with the given ID is not defined`;
    }
  }

  if (error instanceof ErrorResponse) {
    customError = error.message;
  }

  logger.error(JSON.stringify(error));

  const errors = [];

  if (requiredFieldsError !== '') {
    errors.push(requiredFieldsError);
  }
  if (numberTypeFieldsError !== '') {
    errors.push(numberTypeFieldsError);
  }
  if (uniqueFieldError !== '') {
    errors.push(uniqueFieldError);
  }
  if (recordNotFound !== '') {
    errors.push(recordNotFound);
  }
  if (tooSmallFieldError !== '') {
    errors.push(tooSmallFieldError);
  }
  if (customError !== '') {
    errors.push(customError);
  }

  res.status(error.statusCode || statusCode).json({
    message: `${errors.join(' | ')}`,
    error,
  });

  next();
}

export default handleError;
