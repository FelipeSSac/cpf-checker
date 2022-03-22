import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ISystemStatus } from '@modules/SystemStatus/entities/ISystemStatus';

@Entity('system_status')
class SystemStatus implements ISystemStatus {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @Column('int')
    total_checks: number;

  @CreateDateColumn()
    created_at: string;

  @UpdateDateColumn()
    updated_at: string;
}

export { SystemStatus };
