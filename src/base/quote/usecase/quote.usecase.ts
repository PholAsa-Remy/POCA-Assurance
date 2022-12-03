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
    return await this.repository.findBy({ customerId, state: 'active' });
  }

  public async findAllUnsubscribeQuotesFromCustomer(
    customerId: UUID,
  ): Promise<Quote[]> {
    return await this.repository.findBy({ customerId, state: 'pending' });
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
    quote.state = 'pending';
    quote.renewal = true;
    quote.paymentPeriod = 'undefined';
    return await this.repository.save(quote);
  }

  public async delete(quoteId: UUID): Promise<DeleteResult> {
    return await this.repository.delete({ id: quoteId });
  }

  public async subscribeQuote(
    quoteId: UUID,
    paymentPeriod: 'annually' | 'monthly',
  ): Promise<Quote> {
    const expiredAt = new Date();
    expiredAt.setFullYear(expiredAt.getFullYear() + 1);
    expiredAt.setHours(expiredAt.getHours() - 1);
    await this.repository
      .createQueryBuilder()
      .update(Quote)
      .set({
        state: 'active',
        expiredAt,
        paymentPeriod,
      })
      .where('id = :id', { id: quoteId })
      .execute();
    return this.repository.findOneBy({ id: quoteId });
  }

  public async switchRenewalStatement(quoteId: UUID): Promise<Quote> {
    const quote = await this.get(quoteId);
    const renewal = !quote.renewal;
    await this.repository
      .createQueryBuilder()
      .update(Quote)
      .set({
        renewal: renewal,
      })
      .where('id = :id', { id: quoteId })
      .execute();
    return this.repository.findOneBy({ id: quoteId });
  }

  public async renewAllDesiredContracts(): Promise<void> {
    const expiredAt = new Date();
    expiredAt.setFullYear(expiredAt.getFullYear() + 1);
    expiredAt.setHours(expiredAt.getHours() - 1);
    await this.repository
      .createQueryBuilder()
      .update(Quote)
      .set({
        expiredAt,
      })
      .where('renewal = true and expiredAt < Now()')
      .execute();
  }
}
