/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { CelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';

import { AppError } from '../../../errors/AppError';

export function globalErrorHandling(
  err: Error,
  request: Request,
  response: Response,
  _Next: NextFunction,
): Response<any> {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof CelebrateError) {
    const responseBody = {
      status: 'error',
      message: '',
    };

    const {
      type,
      path,
      context,
    } = err.details.values().next().value.details[0];

    const field = path[0];

    switch (type) {
      case 'any.required':
        responseBody.message = `O campo ${field} é obrigatório.`;
        break;
      case 'string.base':
        responseBody.message = `O campo ${field} deve ser do tipo texto.`;
        break;
      case 'string.empty':
        responseBody.message = `O campo ${field} não pode ser um texto vazio.`;
        break;
      case 'string.min':
        responseBody.message = `O campo ${field} não pode ser menor que ${context.limit} caracteres.`;
        break;
      case 'string.max':
        responseBody.message = `O campo ${field} não pode ser maior que ${context.limit} caracteres.`;
        break;
      case 'string.email':
        responseBody.message = `O campo ${field} deve ser um email válido.`;
        break;
      case 'number.base':
        responseBody.message = `O campo ${field} deve ser do tipo número.`;
        break;
      case 'number.min':
        responseBody.message = `O campo ${field} não pode ser menor que ${context.limit}.`;
        break;
      case 'number.max':
        responseBody.message = `O campo ${field} não pode ser maior que ${context.limit}.`;
        break;
      case 'array.base':
        responseBody.message = `O campo ${field} deve ser do tipo array.`;
        break;
      case 'array.empty':
        responseBody.message = `O campo ${field} não pode ser vazio.`;
        break;
      case 'array.min':
        responseBody.message = `O campo ${field} não pode ter um tamanho menor que ${context.limit}.`;
        break;
      case 'array.max':
        responseBody.message = `O campo ${field} não podeer um tamanho maior que ${context.limit}.`;
        break;
      case 'document.cpf':
        responseBody.message = 'O CPF é inválido.';
        break;
      default:
        responseBody.message = 'Aconteceu um erro tente novamente mais tarde.';
        break;
    }

    return response.status(400).json(responseBody);
  }

  return response.status(500).json({
    status: 'error',
    message: 'Server error',
  });
}
