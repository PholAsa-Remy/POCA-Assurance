import { Module } from '@nestjs/common';
import { PaymentController } from './controller/payment.controller';
import { QuoteModule } from '../quote/quote.module';

@Module({
  imports: [QuoteModule],
  controllers: [PaymentController],
  providers: [],
  exports: [],
})
export class PaymentModule {}
