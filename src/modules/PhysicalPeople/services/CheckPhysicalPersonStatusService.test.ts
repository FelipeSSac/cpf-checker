import { v4 as uuid } from 'uuid';

import { AppError } from '@shared/errors/AppError';

import { FakeSystemStatusRepository } from '@modules/SystemStatus/repositories/fakes/FakeSystemStatusRepository';
import { FakePhysicalPeopleRepository } from '../repositories/fakes/FakePhysicalPeopleRepository';

import { CheckPhysicalPersonStatusService } from './CheckPhysicalPersonStatusService';

let fakePhysicalPeopleRepository: FakePhysicalPeopleRepository;
let fakeSystemStatusRepository: FakeSystemStatusRepository;

let checkPhysicalPersonStatusService: CheckPhysicalPersonStatusService;

describe('CheckPhysicalPersonStatusService', () => {
  beforeEach(() => {
    fakePhysicalPeopleRepository = new FakePhysicalPeopleRepository();
    fakeSystemStatusRepository = new FakeSystemStatusRepository();

    checkPhysicalPersonStatusService = new CheckPhysicalPersonStatusService(
      fakePhysicalPeopleRepository,
      fakeSystemStatusRepository,
    );
  });

  it('should be able to show physical person status "BLOCK"', async () => {
    const cpf = '838.497.779-87';

    const person = fakePhysicalPeopleRepository.create({
      id: uuid(),
      cpf,
      is_blacklisted: true,
    });

    await fakePhysicalPeopleRepository.save(person);

    const result = await checkPhysicalPersonStatusService.execute({
      cpf,
    });

    expect(person.is_blacklisted).toBe(true);
    expect(result).toBe('BLOCK');
  });

  it('should be able to show physical person status "FREE"', async () => {
    const cpf = '838.497.779-87';

    const person = fakePhysicalPeopleRepository.create({
      id: uuid(),
      cpf,
      is_blacklisted: false,
    });

    await fakePhysicalPeopleRepository.save(person);

    const result = await checkPhysicalPersonStatusService.execute({
      cpf,
    });

    expect(person.is_blacklisted).toBe(false);
    expect(result).toBe('FREE');
  });

  it('should not be able to show physical person status', async () => {
    await expect(
      checkPhysicalPersonStatusService.execute({
        cpf: '838.497.779-87',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
