import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteController } from './controller/quote.controller';
import { QuoteUseCase } from './usecase/quote.usecase';
import { Quote } from './entity/quote.entity';
import { QuoteSimulator } from './simulator/quote.simulator';
import { PdfModule } from '../pdf/pdf.module';
import { CustomerModule } from '../customer/customer.module';
import { QuoteService } from './service/quote.service';
import { TransactionModule } from '../transaction/transaction.module';
import { PremiumUseCase } from '../transaction/premium/usecase/premium.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quote]),
    PdfModule,
    CustomerModule,
    TransactionModule,
  ],
  controllers: [QuoteController],
  providers: [QuoteUseCase, QuoteSimulator, QuoteService, PremiumUseCase],
  exports: [QuoteUseCase, TypeOrmModule.forFeature([Quote])],
})
export class QuoteModule {}
