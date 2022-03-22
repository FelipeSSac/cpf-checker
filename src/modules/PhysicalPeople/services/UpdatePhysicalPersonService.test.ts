import { v4 as uuid } from 'uuid';

import { AppError } from '@shared/errors/AppError';

import { FakePhysicalPeopleRepository } from '../repositories/fakes/FakePhysicalPeopleRepository';
import { UpdatePhysicalPersonService } from './UpdatePhysicalPersonService';

let fakePhysicalPeopleRepository: FakePhysicalPeopleRepository;

let updatePhysicalPersonService: UpdatePhysicalPersonService;

describe('UpdatePhysicalPersonService', () => {
  beforeEach(() => {
    fakePhysicalPeopleRepository = new FakePhysicalPeopleRepository();

    updatePhysicalPersonService = new UpdatePhysicalPersonService(
      fakePhysicalPeopleRepository,
    );
  });

  it("Should be able to update physical persons's is_blacklisted to true", async () => {
    const person = fakePhysicalPeopleRepository.create({
      id: uuid(),
      cpf: '838.497.779-87',
      is_blacklisted: false,
    });

    await fakePhysicalPeopleRepository.save(person);

    await updatePhysicalPersonService.execute({
      id: person.id,
      is_blacklisted: true,
    });

    expect(person.is_blacklisted).toBe(true);
    expect(person.cpf).toBe('838.497.779-87');
  });

  it("Should be able to update physical persons's is_blacklisted to false", async () => {
    const person = fakePhysicalPeopleRepository.create({
      id: uuid(),
      cpf: '838.497.779-87',
      is_blacklisted: true,
    });

    await fakePhysicalPeopleRepository.save(person);

    await updatePhysicalPersonService.execute({
      id: person.id,
      is_blacklisted: false,
    });

    expect(person.is_blacklisted).toBe(false);
    expect(person.cpf).toBe('838.497.779-87');
  });

  it('Should not be able to update physical persons with inexistent ID', async () => {
    await expect(
      updatePhysicalPersonService.execute({
        id: uuid(),
        is_blacklisted: false,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
