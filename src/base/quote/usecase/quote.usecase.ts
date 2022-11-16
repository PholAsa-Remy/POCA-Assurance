import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuoteCommand } from '../command/quote.command';
import { Quote } from '../entity/quote.entity';

@Injectable()
export class QuoteUseCase {
  @InjectRepository(Quote)
  private readonly repository: Repository<Quote>;

  public async get(id: string): Promise<Quote> {
    return await this.repository.findOneBy({ id });
  }

  public async findAll(): Promise<Quote[]> {
    return await this.repository.find();
  }

  public async findAllQuotesFromCustomer(customerId: number): Promise<Quote[]> {
    return await this.repository.findBy({ customerId });
  }

  public async findAllSubscribeQuotesFromCustomer(
    customerId: number,
  ): Promise<Quote[]> {
    return await this.repository.findBy({ customerId, isSubscribe: true });
  }

  public async findAllUnsubscribeQuotesFromCustomer(
    customerId: number,
  ): Promise<Quote[]> {
    return await this.repository.findBy({ customerId, isSubscribe: false });
  }

  public async create(
    body: CreateQuoteCommand,
    customerId: number,
  ): Promise<Quote> {
    const quote: Quote = new Quote();
    quote.basePrice = body.basePrice;
    quote.includeDamageFromThirdParty = body.includeDamageFromThirdParty;
    quote.deductionDamageFromThirdParty = body.deductionDamageFromThirdParty;
    quote.includeDamageToSelf = body.includeDamageToSelf;
    quote.deductionDamageToSelf = body.deductionDamageToSelf;
    quote.includeBreakDownAndRescue = body.includeBreakDownAndRescue;
    quote.priceBreakDownAndRescue = body.priceBreakDownAndRescue;
    quote.isSubscribe = body.isSubscribe;
    quote.customerId = customerId;
    return await this.repository.save(quote);
  }

  public async subscribeQuote(quoteId: string): Promise<Quote> {
    await this.repository
      .createQueryBuilder()
      .update(Quote)
      .set({ isSubscribe: true })
      .where('id = :id', { id: quoteId })
      .execute();
    return this.repository.findOneBy({ id: quoteId });
  }
}
