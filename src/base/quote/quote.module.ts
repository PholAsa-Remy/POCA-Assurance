import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteController } from './controller/quote.controller';
import { QuoteUseCase } from './usecase/quote.usecase';
import { Quote } from './entity/quote.entity';
import { QuoteSimulator } from './simulator/quote.simulator';
import { PdfModule } from '../pdf/pdf.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  controllers: [QuoteController],
  providers: [QuoteUseCase, QuoteSimulator],
  exports: [QuoteUseCase],
  imports: [TypeOrmModule.forFeature([Quote]), PdfModule, CustomerModule],
})
export class QuoteModule {}
