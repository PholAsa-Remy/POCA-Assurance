import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from '../../../../shared/type';
import { Reimbursement } from '../entity/reimbursement.entity';
import { CreateReimbursementCommand } from '../command/reimbursement.command';
import { SinisterUseCase } from '../../../reportsinister/usecase/sinister.usecase';
import { Sinister } from '../../../reportsinister/entity/sinister.entity';
import { GALACTIC_CREDIT } from '../../../../shared/typeorm/typeorm.currency.valuetransformer';

@Injectable()
export class ReimbursementUseCase {
  @InjectRepository(Reimbursement)
  private readonly repository: Repository<Reimbursement>;

  @Inject(SinisterUseCase)
  private sinisterUseCase: SinisterUseCase;

  async findOneById(reimbursementId: UUID): Promise<Reimbursement> {
    return await this.repository.findOneBy({ id: reimbursementId });
  }

  async findAllReimbursementFromSinister(
    sinisterId: UUID,
  ): Promise<Reimbursement[]> {
    return await this.repository.findBy({ sinisterId: sinisterId });
  }

  public async findAllReimbursementFromUser(
    customerId: string,
  ): Promise<Reimbursement[]> {
    const sinisterArray: Sinister[] =
      await this.sinisterUseCase.findAllSinisterFromUser(customerId);
    let theReimbursementArray: Reimbursement[] = [];
    for (const aSinister of sinisterArray) {
      const temp = await this.findAllReimbursementFromSinister(aSinister.id);
      theReimbursementArray = theReimbursementArray.concat(temp);
    }

    return theReimbursementArray;
  }

  public async findNotReimbursedSinister(): Promise<Sinister[]> {
    const alreadyReimbursedSinisterArray = await this.repository
      .createQueryBuilder('Reimbursement')
      .getMany();
    const arrayOfAlreadyReimbursedSinisterId = [];
    for (const sinister of alreadyReimbursedSinisterArray) {
      arrayOfAlreadyReimbursedSinisterId.push(sinister.sinisterId);
    }
    return await this.sinisterUseCase.findAllwithIdnotIn(
      arrayOfAlreadyReimbursedSinisterId,
    );

  
  }

  async findAll(): Promise<Reimbursement[]> {
    return await this.repository.find();
  }

  async create(body: CreateReimbursementCommand): Promise<Reimbursement> {
    const reimbursement: Reimbursement = new Reimbursement();
    reimbursement.sinisterId = body.sinisterId;
    reimbursement.date = new Date();
    reimbursement.amount = GALACTIC_CREDIT(body.amount);
    return await this.repository.save(reimbursement);
  }
}
