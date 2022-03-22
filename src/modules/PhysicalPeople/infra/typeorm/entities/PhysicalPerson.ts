import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IPhysicalPerson } from '@modules/PhysicalPeople/entities/PhysicalPerson';

@Entity('physical_people')
class PhysicalPerson implements IPhysicalPerson {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column('varchar')
    cpf: string;

  @Column('boolean')
    is_blacklisted: boolean;

  @CreateDateColumn()
    created_at: string;

  @UpdateDateColumn()
    updated_at: string;
}

export { PhysicalPerson };
