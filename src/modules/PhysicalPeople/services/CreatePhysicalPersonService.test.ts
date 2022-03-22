import { AppError } from '@shared/errors/AppError';

import { FakePhysicalPeopleRepository } from '../repositories/fakes/FakePhysicalPeopleRepository';
import { CreatePhysicalPersonService } from './CreatePhysicalPersonService';

let fakePhysicalPeopleRepository: FakePhysicalPeopleRepository;

let createPhysicalPersonService: CreatePhysicalPersonService;

describe('CreatePhysicalPersonService', () => {
  beforeEach(() => {
    fakePhysicalPeopleRepository = new FakePhysicalPeopleRepository();

    createPhysicalPersonService = new CreatePhysicalPersonService(
      fakePhysicalPeopleRepository,
    );
  });

  it('Should be able to create physical person', async () => {
    const physicalPeople = await createPhysicalPersonService.execute({
      cpf: '838.497.779-87',
      is_blacklisted: false,
    });

    expect(physicalPeople).toHaveProperty('id');
    expect(physicalPeople.cpf).toBe('838.497.779-87');
    expect(physicalPeople.is_blacklisted).toBe(false);
  });

  it('Should be able to create physical person blacklisted', async () => {
    const physicalPeople = await createPhysicalPersonService.execute({
      cpf: '838.497.779-87',
      is_blacklisted: true,
    });

    expect(physicalPeople).toHaveProperty('id');
    expect(physicalPeople.cpf).toBe('838.497.779-87');
    expect(physicalPeople.is_blacklisted).toBe(true);
  });

  it('Should not be able to create physical person with same CPF', async () => {
    await createPhysicalPersonService.execute({
      cpf: '838.497.779-87',
      is_blacklisted: false,
    });

    await expect(
      createPhysicalPersonService.execute({
        cpf: '838.497.779-87',
        is_blacklisted: false,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
