import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateQuoteCommand } from '../command/quote.command';
import { Quote } from '../entity/quote.entity';
import { UUID } from '../../../shared/type';

@Injectable()
export class QuoteUseCase {
  @InjectRepository(Quote)
  private readonly repository: Repository<Quote>;

  public async get(quoteId: UUID): Promise<Quote> {
    return await this.repository.findOneBy({ id: quoteId });
  }

  public async findAll(): Promise<Quote[]> {
    return await this.repository.find();
  }

  public async findAllQuotesFromCustomer(customerId: UUID): Promise<Quote[]> {
    return await this.repository.findBy({ customerId });
  }

  public async findAllSubscribeQuotesFromCustomer(
    customerId: UUID,
  ): Promise<Quote[]> {
    return await this.repository.findBy({ customerId, isSubscribe: true });
  }

  public async findAllUnsubscribeQuotesFromCustomer(
    customerId: UUID,
  ): Promise<Quote[]> {
    return await this.repository.findBy({ customerId, isSubscribe: false });
  }

  public async create(
    body: CreateQuoteCommand,
    customerId: UUID,
  ): Promise<Quote> {
    const quote: Quote = new Quote();
    quote.basePrice = body.basePrice;
    quote.includeDamageFromThirdParty = body.includeDamageFromThirdParty;
    quote.deductionDamageFromThirdParty = body.deductionDamageFromThirdParty;
    quote.includeDamageToSelf = body.includeDamageToSelf;
    quote.deductionDamageToSelf = body.deductionDamageToSelf;
    quote.includeBreakDownAndRescue = body.includeBreakDownAndRescue;
    quote.priceBreakDownAndRescue = body.priceBreakDownAndRescue;
    quote.customerId = customerId;
    quote.isSubscribe = false;
    return await this.repository.save(quote);
  }

  public async delete(quoteId: UUID): Promise<DeleteResult> {
    return await this.repository.delete({ id: quoteId });
  }

  public async subscribeQuote(quoteId: UUID): Promise<Quote> {
    await this.repository
      .createQueryBuilder()
      .update(Quote)
      .set({ isSubscribe: true })
      .where('id = :id', { id: quoteId })
      .execute();
    return this.repository.findOneBy({ id: quoteId });
  }
}
