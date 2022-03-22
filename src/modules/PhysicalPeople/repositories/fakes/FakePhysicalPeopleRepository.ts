import { IPhysicalPerson } from '@modules/PhysicalPeople/entities/PhysicalPerson';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';

import { ICreatePhysicalPersonDTO } from '@modules/PhysicalPeople/dtos/ICreatePhysicalPersonDTO';
import { IIndexPhysicsPeopleDTO } from '@modules/PhysicalPeople/dtos/IIndexPhysicsPeopleDTO';

import { PhysicalPerson } from '@modules/PhysicalPeople/infra/typeorm/entities/PhysicalPerson';
import { IPhysicalPeopleRepository } from '../IPhysicalPeopleRepository';

class FakePhysicalPeopleRepository implements IPhysicalPeopleRepository {
  private physicalPeople: IPhysicalPerson[] = [];

  public async index({
    page = 1,
    limit = 10,
    is_blacklisted,
  }: IIndexPhysicsPeopleDTO): Promise<IPaginatedResponse<IPhysicalPerson>> {
    const minValue = (page - 1) * limit;
    const maxValue = minValue + limit;

    const paginatedUsers = is_blacklisted !== undefined
      ? this.physicalPeople
        .filter((user) => user.is_blacklisted === is_blacklisted)
        .slice(minValue, maxValue)
      : this.physicalPeople
        .slice(minValue, maxValue);

    return {
      page,
      limit,
      results: paginatedUsers,
      total: this.physicalPeople.length,
    };
  }

  public async findById(id: string): Promise<IPhysicalPerson | undefined> {
    const physicalPerson = this.physicalPeople.find(
      (findPhysicalPerson) => findPhysicalPerson.id === id,
    );

    return physicalPerson;
  }

  public async findByCPF(cpf: string): Promise<IPhysicalPerson | undefined> {
    const physicalPerson = this.physicalPeople.find(
      (findPhysicalPerson) => findPhysicalPerson.cpf === cpf,
    );

    return physicalPerson;
  }

  public async getBlacklistedQuantity(): Promise<number> {
    const quantity = this.physicalPeople.filter(
      (physicalPerson) => physicalPerson.is_blacklisted === true,
    ).length;

    return quantity;
  }

  public create(data: ICreatePhysicalPersonDTO): IPhysicalPerson {
    const physicalPerson = new PhysicalPerson();

    Object.assign(physicalPerson, data);

    return physicalPerson;
  }

  public async save(physicalPerson: IPhysicalPerson): Promise<IPhysicalPerson> {
    this.physicalPeople.push(physicalPerson);

    return physicalPerson;
  }

  public async remove(data: IPhysicalPerson): Promise<void> {
    const physicalPerson = data;

    const findIndex = this.physicalPeople.findIndex(
      (findPhysicalPerson) => findPhysicalPerson.id === physicalPerson.id,
    );

    this.physicalPeople.splice(findIndex, 1);
  }
}

export { FakePhysicalPeopleRepository };
