import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Customer } from '../../customer/entity/customer.entity';
import { Sinister } from '../../reportsinister/entity/sinister.entity';
import { UUID } from '../../../shared/type';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  public id!: UUID;

  @ManyToOne(() => Customer, (customer) => customer.quotes)
  public customer: Customer;

  @OneToMany(() => Sinister, (sinister) => sinister.quoteId)
  public sinisters: Sinister[];

  @Column()
  public customerId: UUID;

  @Column()
  public basePrice: number;

  @Column()
  public includeDamageFromThirdParty: boolean;

  @Column()
  public deductionDamageFromThirdParty: number;

  @Column()
  public includeDamageToSelf: boolean;

  @Column()
  public deductionDamageToSelf: number;

  @Column()
  public includeBreakDownAndRescue: boolean;

  @Column()
  public priceBreakDownAndRescue: number;

  @Column()
  public isSubscribe: boolean;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
