import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QuoteUseCase } from '../usecase/quote.usecase';

@Injectable()
export class QuoteService {
  @Inject(QuoteUseCase)
  private readonly quoteUseCase: QuoteUseCase;

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  dailyUpdateContract() {
    this.quoteUseCase.renewAllDesiredContracts();
    this.quoteUseCase.updateContractState();
  }
}
