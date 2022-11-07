import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Customer } from '../../customer/entity/customer.entity';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => Customer, (customer) => customer.quotes)
  public customer: Customer;

  @Column()
  public customerId: number;

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
