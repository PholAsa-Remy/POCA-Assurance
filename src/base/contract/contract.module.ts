import { Module } from '@nestjs/common';
import { ContractController } from './controller/contract.controller';
import { QuoteUseCase } from '../quote/usecase/quote.usecase';
import { RefundUseCase } from '../transaction/refund/usecase/refund.usecase';
import { PremiumUseCase } from '../transaction/premium/usecase/premium.usecase';
import { QuoteModule } from '../quote/quote.module';
import { PremiumModule } from '../transaction/premium/premium.module';
import { RefundModule } from '../transaction/refund/refund.module';

@Module({
  imports: [QuoteModule, PremiumModule, RefundModule],
  controllers: [ContractController],
  providers: [QuoteUseCase, RefundUseCase, PremiumUseCase],
  exports: [],
})
export class ContractModule {}
