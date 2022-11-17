import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Quote } from '../../quote/entity/quote.entity';
import { Payment } from "../../payment/entity/payment.entity";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 120 })
  public username: string;

  @Column({ type: 'varchar', length: 120 })
  public password: string;

  @Column({ type: 'varchar', length: 120 })
  public address: string;

  @Column({ type: 'varchar', length: 120 })
  public email: string;

  @Column({ type: 'varchar', length: 120 })
  public phoneNumber: string;

  @OneToMany(() => Quote, (quote) => quote.customerId)
  public quotes: Quote[];

  @OneToMany(() => Payment, (payment) => payment.customerId)
  public payments: Payment[];
}
