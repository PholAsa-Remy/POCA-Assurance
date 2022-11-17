import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Customer } from "../../customer/entity/customer.entity";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Customer, (customer) => customer.payments)
  public customer: Customer;

  @Column()
  public customerId: number;

  @Column()
  public price: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;
}
