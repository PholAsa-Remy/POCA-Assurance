import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  public id: number;

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
}
