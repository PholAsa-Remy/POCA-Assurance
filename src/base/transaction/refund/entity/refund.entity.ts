import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import * as currency from 'currency.js';
import { UUID } from '../../../../shared/type';
import { Quote } from '../../../quote/entity/quote.entity';
import { currencyTransformer } from '../../../../shared/typeorm/typeorm.currency.valuetransformer';

@Entity()
export class Refund {
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
  public quoteId!: UUID;

  @ManyToOne(() => Quote)
  public quote!: Quote;
}
