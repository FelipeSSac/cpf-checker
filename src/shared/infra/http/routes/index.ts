import { Router } from 'express';

import { physicalPeopleRouter } from '@modules/PhysicalPeople/infra/http/routes/physicalPeople.routes';
import { systemStatusRouter } from '@modules/SystemStatus/infra/http/routes/systemStatus.routes';

const routes = Router();

routes.use('/physical-people', physicalPeopleRouter);
routes.use('/status', systemStatusRouter);

export { routes };
