import { UUID } from 'src/shared/type';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Quote } from '../../quote/entity/quote.entity';

@Entity()
export class Sinister {
  @PrimaryGeneratedColumn('uuid')
  public id!: UUID;

  @ManyToOne(() => Quote, (quote) => quote.sinisters)
  public quote: Quote;

  @Column()
  public quoteId: UUID;

  @Column({ type: 'text' })
  public description!: string;

  @Column()
  public damageValue!: number;

  @Column({ type: 'timestamp' })
  public accidentDate!: Date;

  /*
   * Date at which the client reported his sinister
   */
  @CreateDateColumn({ type: 'timestamp' })
  public reportedDate!: Date;
}
