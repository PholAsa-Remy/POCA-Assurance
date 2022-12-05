import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from '../../../../shared/type';
import { Refund } from '../entity/refund.entity';
import { CreateRefundCommand } from '../command/refund.command';

@Injectable()
export class RefundUseCase {
  @InjectRepository(Refund)
  private readonly repository: Repository<Refund>;

  async findOneById(refundId: UUID): Promise<Refund> {
    return await this.repository.findOneBy({ id: refundId });
  }

  async findAll(): Promise<Refund[]> {
    return await this.repository.find();
  }

  async create(body: CreateRefundCommand): Promise<Refund> {
    const refund: Refund = new Refund();
    refund.quoteId = body.quoteId;
    refund.date = new Date();
    refund.amount = body.amount;
    return await this.repository.save(refund);
  }
}
