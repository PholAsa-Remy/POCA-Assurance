import { Module } from '@nestjs/common';
import { PaymentController } from './controller/payment.controller';
import { QuoteModule } from '../quote/quote.module';
import { TransactionModule } from '../transaction/transaction.module';
import { PremiumUseCase } from '../transaction/premium/usecase/premium.usecase';

@Module({
  imports: [QuoteModule, TransactionModule],
  controllers: [PaymentController],
  providers: [PremiumUseCase],
  exports: [],
})
export class PaymentModule {}
