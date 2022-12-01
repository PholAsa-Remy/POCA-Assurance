import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSinisterReportCommand } from '../command/sinister.command';
import { Sinister } from '../entity/sinister.entity';
import { Quote } from '../../quote/entity/quote.entity';
import { QuoteUseCase } from '../../quote/usecase/quote.usecase';
import { UUID } from 'src/shared/type';

@Injectable()
export class SinisterUseCase {
  @Inject(QuoteUseCase)
  private quoteUseCase: QuoteUseCase;

  @InjectRepository(Sinister)
  private readonly repository: Repository<Sinister>;

  public async get(id: number): Promise<Sinister> {
    return await this.repository.findOneBy({ id });
  }

  public async findAll(): Promise<Sinister[]> {
    return await this.repository.find();
  }

  public async findAllSinisterFromUser(
    customerId: string,
  ): Promise<Sinister[]> {
    const quoteIda: Quote[] =
      await this.quoteUseCase.findAllSubscribeQuotesFromCustomer(customerId);
    let theSinisterArray: Array<Sinister> = new Array<Sinister>();
    for (const aQuoteId of quoteIda) {
      const temp = await this.findAllSinisterFromQuote(aQuoteId.id);
      theSinisterArray = theSinisterArray.concat(temp);
    }

    return theSinisterArray;
  }

  public async findAllSinisterFromQuote(quoteId: UUID): Promise<Sinister[]> {
    return await this.repository.findBy({ quoteId });
  }

  public async create(
    body: CreateSinisterReportCommand,
    quoteId: string,
  ): Promise<Sinister> {
    const sinister: Sinister = new Sinister();
    sinister.accidentDate = body.sinisterDate;
    sinister.description = body.sinisterMessage;
    sinister.reportedDate = new Date(Date.now());
    sinister.quoteId = body.quoteId;
    return await this.repository.save(sinister);
  }
}
