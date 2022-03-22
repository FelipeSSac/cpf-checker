import { getRepository, Repository } from 'typeorm';

import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';

import { IPhysicalPeopleRepository } from '@modules/PhysicalPeople/repositories/IPhysicalPeopleRepository';

import { ICreatePhysicalPersonDTO } from '@modules/PhysicalPeople/dtos/ICreatePhysicalPersonDTO';
import { IIndexPhysicsPeopleDTO } from '@modules/PhysicalPeople/dtos/IIndexPhysicsPeopleDTO';
import { IPhysicalPerson } from '@modules/PhysicalPeople/entities/PhysicalPerson';

import { PhysicalPerson } from '../entities/PhysicalPerson';

class PhysicalPeopleRepository implements IPhysicalPeopleRepository {
  private repository: Repository<IPhysicalPerson>;

  constructor() {
    this.repository = getRepository(PhysicalPerson);
  }

  public async index({
    page = 1,
    limit = 10,
    is_blacklisted,
  }: IIndexPhysicsPeopleDTO): Promise<IPaginatedResponse<IPhysicalPerson>> {
    const builder = this.repository.createQueryBuilder('physical_people');

    if (is_blacklisted !== undefined) {
      builder.where('physical_people.is_blacklisted = :is_blacklisted', {
        is_blacklisted,
      });
    }

    const [physicalPeople, total] = await builder
      .skip((page - 1) * limit)
      .limit(limit)
      .getManyAndCount();

    return {
      limit,
      page,
      results: physicalPeople,
      total,
    };
  }

  public async findById(id: string): Promise<IPhysicalPerson | undefined> {
    const physicalPerson = await this.repository.findOne(id);

    return physicalPerson;
  }

  public async findByCPF(cpf: string): Promise<IPhysicalPerson | undefined> {
    const physicalPerson = await this.repository.findOne({ where: { cpf } });

    return physicalPerson;
  }

  public async getBlacklistedQuantity(): Promise<number> {
    const quantity = await this.repository.count({
      where: { is_blacklisted: true },
    });

    return quantity;
  }

  public create({
    cpf,
    is_blacklisted = false,
  }: ICreatePhysicalPersonDTO): IPhysicalPerson {
    const physicalPerson = this.repository.create({
      cpf,
      is_blacklisted,
    });

    return physicalPerson;
  }

  public async save(data: IPhysicalPerson): Promise<IPhysicalPerson> {
    const physicalPerson = this.repository.save(data);

    return physicalPerson;
  }

  public async remove(data: IPhysicalPerson): Promise<void> {
    await this.repository.remove(data);
  }
}

export { PhysicalPeopleRepository };
