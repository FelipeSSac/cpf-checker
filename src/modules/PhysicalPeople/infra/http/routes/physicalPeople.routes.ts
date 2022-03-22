import { Router } from 'express';

import { PhysicalPeopleController } from '../controllers/PhysicalPeopleController';
import { check, create, update } from '../validations/physicalPeople.validation';

const physicalPeopleRouter = Router();
const physicalPeopleController = new PhysicalPeopleController();

physicalPeopleRouter.get('/', physicalPeopleController.index);

physicalPeopleRouter.get(
  '/:cpf',
  check,
  physicalPeopleController.check,
);

physicalPeopleRouter.post(
  '/',
  create,
  physicalPeopleController.create,
);

physicalPeopleRouter.put(
  '/:id',
  update,
  physicalPeopleController.update,
);

export { physicalPeopleRouter };
