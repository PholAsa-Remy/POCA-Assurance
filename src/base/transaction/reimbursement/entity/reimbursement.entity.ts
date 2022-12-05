import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import * as currency from 'currency.js';
import { UUID } from '../../../../shared/type';
import { currencyTransformer } from '../../../../shared/typeorm/typeorm.currency.valuetransformer';
import { Sinister } from '../../../reportsinister/entity/sinister.entity';

@Entity()
export class Reimbursement {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: currencyTransformer,
  })
  public amount!: currency;

  @Column({ type: 'timestamp' })
  public date!: Date;

  @Column()
  public sinisterId!: UUID;

  @ManyToOne(() => Sinister)
  public sinister!: Sinister;
}
