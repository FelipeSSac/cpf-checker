import { v4 as uuid } from 'uuid';

import { FakePhysicalPeopleRepository } from '../repositories/fakes/FakePhysicalPeopleRepository';
import { IndexPhysicalPeopleService } from './IndexPhysicalPeopleService';

let fakePhysicalPeopleRepository: FakePhysicalPeopleRepository;

let indexPhysicalPeopleService: IndexPhysicalPeopleService;

describe('IndexPhysicalPeopleService', () => {
  beforeEach(() => {
    fakePhysicalPeopleRepository = new FakePhysicalPeopleRepository();

    indexPhysicalPeopleService = new IndexPhysicalPeopleService(
      fakePhysicalPeopleRepository,
    );
  });

  it('Should be able to index Physical People', async () => {
    const firstPerson = fakePhysicalPeopleRepository.create({
      id: uuid(),
      cpf: '838.497.779-87',
      is_blacklisted: false,
    });

    await fakePhysicalPeopleRepository.save(firstPerson);

    const secondPerson = fakePhysicalPeopleRepository.create({
      id: uuid(),
      cpf: '773.832.032-08',
      is_blacklisted: false,
    });

    await fakePhysicalPeopleRepository.save(secondPerson);

    const physicalPeople = await indexPhysicalPeopleService.execute({
      page: 1,
      limit: 10,
    });

    expect(physicalPeople.results).toEqual([firstPerson, secondPerson]);
    expect(physicalPeople.results.length).toBe(2);
    expect(physicalPeople.page).toBe(1);
    expect(physicalPeople.limit).toBe(10);
    expect(physicalPeople.total).toBe(2);
  });

  it('Should be able to index Physical People with blacklisted CPF', async () => {
    const firstPerson = fakePhysicalPeopleRepository.create({
      id: uuid(),
      cpf: '838.497.779-87',
      is_blacklisted: true,
    });

    await fakePhysicalPeopleRepository.save(firstPerson);

    const secondPerson = fakePhysicalPeopleRepository.create({
      id: uuid(),
      cpf: '773.832.032-08',
      is_blacklisted: false,
    });

    await fakePhysicalPeopleRepository.save(secondPerson);

    const thirdPerson = fakePhysicalPeopleRepository.create({
      id: uuid(),
      cpf: '747.698.914-74',
      is_blacklisted: true,
    });

    await fakePhysicalPeopleRepository.save(thirdPerson);

    const physicalPeople = await indexPhysicalPeopleService.execute({
      page: 1,
      limit: 10,
      is_blacklisted: true,
    });

    expect(physicalPeople.results).toEqual([firstPerson, thirdPerson]);
    expect(physicalPeople.results.length).toBe(2);
    expect(physicalPeople.page).toBe(1);
    expect(physicalPeople.limit).toBe(10);
    expect(physicalPeople.total).toBe(3);
  });

  it('Should be able to index Physical People with no blacklisted CPF', async () => {
    const firstPerson = fakePhysicalPeopleRepository.create({
      id: uuid(),
      cpf: '838.497.779-87',
      is_blacklisted: true,
    });

    await fakePhysicalPeopleRepository.save(firstPerson);

    const secondPerson = fakePhysicalPeopleRepository.create({
      id: uuid(),
      cpf: '773.832.032-08',
      is_blacklisted: false,
    });

    await fakePhysicalPeopleRepository.save(secondPerson);

    const thirdPerson = fakePhysicalPeopleRepository.create({
      id: uuid(),
      cpf: '747.698.914-74',
      is_blacklisted: true,
    });

    await fakePhysicalPeopleRepository.save(thirdPerson);

    const physicalPeople = await indexPhysicalPeopleService.execute({
      page: 1,
      limit: 10,
      is_blacklisted: false,
    });

    expect(physicalPeople.results).toEqual([secondPerson]);
    expect(physicalPeople.results.length).toBe(1);
    expect(physicalPeople.page).toBe(1);
    expect(physicalPeople.limit).toBe(10);
    expect(physicalPeople.total).toBe(3);
  });
});
