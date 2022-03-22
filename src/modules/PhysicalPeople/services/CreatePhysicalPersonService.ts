import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { AppError } from '@shared/errors/AppError';

import { IPhysicalPeopleRepository } from '../repositories/IPhysicalPeopleRepository';
import { IPhysicalPerson } from '../entities/PhysicalPerson';

interface IRequest {
  cpf: string;
  is_blacklisted: boolean;
}

@injectable()
class CreatePhysicalPersonService {
  constructor(
    @inject('PhysicalPeopleRepository')
    private physicalPeopleRepository: IPhysicalPeopleRepository,
  ) {}

  public async execute({
    cpf,
    is_blacklisted,
  }: IRequest): Promise<IPhysicalPerson> {
    const personExists = await this.physicalPeopleRepository.findByCPF(cpf);

    if (personExists) {
      throw new AppError('CPF em uso!', 400);
    }

    const physicalPersonId = uuid();

    const physicalPerson = this.physicalPeopleRepository.create({
      id: physicalPersonId,
      cpf,
      is_blacklisted,
    });

    await this.physicalPeopleRepository.save(physicalPerson);

    return physicalPerson;
  }
}

export { CreatePhysicalPersonService };
