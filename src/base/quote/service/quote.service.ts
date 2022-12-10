import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QuoteUseCase } from '../usecase/quote.usecase';
import { PremiumUseCase } from '../../transaction/premium/usecase/premium.usecase';

@Injectable()
export class QuoteService {
  @Inject(QuoteUseCase)
  private readonly quoteUseCase: QuoteUseCase;

  @Inject(PremiumUseCase)
  private readonly premiumUseCase: PremiumUseCase;

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async dailyUpdateContract() {
    this.quoteUseCase.updateContractState();
    const renewedContract = await this.quoteUseCase.renewAllDesiredContracts();
    renewedContract.forEach((contract) => {
      if (contract.paymentPeriod === 'annually') {
        this.premiumUseCase.registerYearlyPremium(
          contract.id,
          contract.basePrice,
        );
      } else if (contract.paymentPeriod === 'monthly') {
        this.premiumUseCase.registerMonthlyPremiums(
          contract.id,
          contract.basePrice,
        );
      }
    });
  }
}
