import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteController } from './controller/quote.controller';
import { QuoteUseCase } from './usecase/quote.usecase';
import { Quote } from './entity/quote.entity';
import { QuoteSimulator } from './simulator/quote.simulator';

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  controllers: [QuoteController],
  providers: [QuoteUseCase, QuoteSimulator],
  exports: [QuoteUseCase],
})
export class QuoteModule {}
