import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateSinisterReportCommand} from '../command/sinister.command';
import { Sinister } from '../entity/sinister.entity';
import { Customer } from '../../customer/entity/customer.entity';
import { Quote } from '../../quote/entity/quote.entity';

@Injectable()
export class SinisterUseCase {
  @InjectRepository(Sinister)
  private readonly repository: Repository<Sinister>;

  public async get(id: number): Promise<Sinister> {
    return await this.repository.findOneBy({ id });
  }

  public async findAll(): Promise<Sinister[]> {
    return await this.repository.find();
  }
  /*
  public async findAllSinisterFromQuote(quoteId: Number,): Promise<Sinister[]> {
    return await this.repository.findBy({ quoteId });
  }
  */

  public async create(
    body: CreateSinisterReportCommand,
    quoteId: number,
  ): Promise<Sinister> {
    const sinister: Sinister = new Sinister();
    sinister.accidentDate=body.accidentDate
    sinister.description=body.description
    sinister.accidentDate= new Date( Date.now())
    //sinister.quoteId = body.quoteId
    return await this.repository.save(sinister);
  }

}
