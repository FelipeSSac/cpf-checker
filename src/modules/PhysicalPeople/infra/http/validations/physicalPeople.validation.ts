import { Joi, Segments, celebrate } from 'celebrate';
import validator from 'cpf-cnpj-validator';

const JoiDocument = Joi.extend(validator);

export const check = celebrate({
  [Segments.PARAMS]: {
    cpf: JoiDocument.document().cpf().required(),
  },
});

export const create = celebrate({
  [Segments.BODY]: {
    cpf: JoiDocument.document().cpf().required(),
    is_blacklisted: Joi.boolean().default(false),
  },
});

export const update = celebrate({
  [Segments.PARAMS]: {
    cpf: JoiDocument.document().cpf().required(),
  },
  [Segments.BODY]: {
    is_blacklisted: Joi.boolean().required(),
  },
});
