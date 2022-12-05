import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from '../../../../shared/type';
import { Reimbursement } from '../entity/reimbursement.entity';
import { CreateReimbursementCommand } from '../command/reimbursement.command';

@Injectable()
export class ReimbursementUseCase {
  @InjectRepository(Reimbursement)
  private readonly repository: Repository<Reimbursement>;

  async findOneById(reimbursementId: UUID): Promise<Reimbursement> {
    return await this.repository.findOneBy({ id: reimbursementId });
  }

  async findAll(): Promise<Reimbursement[]> {
    return await this.repository.find();
  }

  async create(body: CreateReimbursementCommand): Promise<Reimbursement> {
    const reimbursement: Reimbursement = new Reimbursement();
    reimbursement.sinisterId = body.sinisterId;
    reimbursement.date = new Date();
    reimbursement.amount = body.amount;
    return await this.repository.save(reimbursement);
  }
}
