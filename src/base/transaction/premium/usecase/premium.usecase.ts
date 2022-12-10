import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, MoreThan, Repository } from 'typeorm';
import { UUID } from '../../../../shared/type';
import { Premium } from '../entity/premium.entity';
import {
  CreatePremiumCommand,
  CreatePremiumCommandWithSetDate,
  DeletePremiumAfterNowCommand,
  FindFuturePremiumByQuoteCommand,
} from '../command/premium.command';
import { GALACTIC_CREDIT } from '../../../../shared/typeorm/typeorm.currency.valuetransformer';
import { Quote } from '../../../quote/entity/quote.entity';

@Injectable()
export class PremiumUseCase {
  @InjectRepository(Premium)
  private readonly repository: Repository<Premium>;

  async findOneById(premiumId: UUID): Promise<Premium> {
    return await this.repository.findOneBy({ id: premiumId });
  }

  async findAll(): Promise<Premium[]> {
    return await this.repository.find();
  }

  async create(body: CreatePremiumCommand): Promise<Premium> {
    const premium: Premium = new Premium();
    premium.quoteId = body.quoteId;
    premium.date = new Date();
    premium.amount = body.amount;
    return await this.repository.save(premium);
  }

  async createWithSetDate(
    body: CreatePremiumCommandWithSetDate,
  ): Promise<Premium> {
    const premium: Premium = new Premium();
    premium.quoteId = body.quoteId;
    premium.date = body.date;
    premium.amount = body.amount;
    return await this.repository.save(premium);
  }

  public async deleteAllAfterNow(
    body: DeletePremiumAfterNowCommand,
  ): Promise<DeleteResult> {
    const quoteId = body.id;
    return await this.repository.delete({
      quoteId: quoteId,
      date: MoreThan(new Date()),
    });
  }

  async registerYearlyPremium(
    quoteId: UUID,
    basePrice: number,
  ): Promise<Premium> {
    const premium: Premium = new Premium();
    premium.quoteId = quoteId;
    premium.date = new Date();
    premium.amount = GALACTIC_CREDIT(12 * basePrice);
    return await this.repository.save(premium);
  }

  async registerMonthlyPremiums(
    quoteId: UUID,
    basePrice: number,
  ): Promise<Premium[]> {
    const premiums: Premium[] = [];
    const date: Date = new Date();
    for (let i = 0; i < 12; i++) {
      const manipulatedDate: Date = new Date(date);
      manipulatedDate.setMonth(manipulatedDate.getMonth() + i);

      const createPremiumCommandWithSetDate: CreatePremiumCommandWithSetDate = {
        quoteId: quoteId,
        amount: GALACTIC_CREDIT(basePrice),
        date: manipulatedDate,
      };
      const premium = await this.createWithSetDate(
        createPremiumCommandWithSetDate,
      );
      premiums.push(premium);
    }

    return premiums;
  }

  public async findFuturePremiumByQuote(
    body: FindFuturePremiumByQuoteCommand,
  ): Promise<Premium[]> {
    const quoteId = body.id;
    return await this.repository.findBy({
      quoteId: quoteId,
      date: MoreThan(new Date()),
    });
  }
}
