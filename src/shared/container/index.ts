import { container } from 'tsyringe';

import './providers';

import { PhysicalPeopleRepository } from '@modules/PhysicalPeople/infra/typeorm/repositories/PhysicalPeopleRepository';
import { IPhysicalPeopleRepository } from '@modules/PhysicalPeople/repositories/IPhysicalPeopleRepository';

import { ISystemStatusRepository } from '@modules/SystemStatus/repositories/ISystemStatusRepository';
import { SystemStatusRepository } from '@modules/SystemStatus/infra/typeorm/repositories/SystemStatusRepository';

container.registerSingleton<IPhysicalPeopleRepository>(
  'PhysicalPeopleRepository',
  PhysicalPeopleRepository,
);

container.registerSingleton<ISystemStatusRepository>(
  'SystemStatusRepository',
  SystemStatusRepository,
);
