import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
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

  public async get(id: UUID): Promise<Sinister> {
    return await this.repository.findOneBy({ id });
  }

  public async findAll(): Promise<Sinister[]> {
    return await this.repository
      .createQueryBuilder('sinister')
      .innerJoinAndSelect('sinister.quote', 'quote')
      .getMany();
  }

  public async findAllwithIdnotIn(idArray: UUID[]): Promise<Sinister[]> {
    const theresult = await this.repository.createQueryBuilder('sinister');
    if (idArray.length > 0) {
      theresult.where('sinister.id NOT IN  (:...array)', { array: idArray });
    }
    theresult.innerJoinAndSelect('sinister.quote', 'quote');
    return await theresult.getMany();
  }

  public async findAllSinisterFromUser(
    customerId: string,
  ): Promise<Sinister[]> {
    const quoteIda: Quote[] =
      await this.quoteUseCase.findAllSubscribeQuotesFromCustomer(customerId);
    let theSinisterArray: Sinister[] = [];
    for (const aQuoteId of quoteIda) {
      const temp = await this.findAllSinisterFromQuote(aQuoteId.id);
      theSinisterArray = theSinisterArray.concat(temp);
    }

    return theSinisterArray;
  }

  public async findAllSinisterFromQuote(quoteId: UUID): Promise<Sinister[]> {
    return await this.repository.findBy({ quoteId });
  }

  public async create(body: CreateSinisterReportCommand): Promise<Sinister> {
    const sinister: Sinister = new Sinister();
    sinister.accidentDate = body.sinisterDate;
    sinister.description = body.sinisterMessage;
    sinister.reportedDate = new Date(Date.now());
    sinister.damageValue = body.damageValue;
    sinister.quoteId = body.quoteId;
    return await this.repository.save(sinister);
  }
}
