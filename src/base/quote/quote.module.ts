import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteController } from './quote.controller';
import { QuoteUseCase } from './quote.usecase';
import { Quote } from './quote.entity';
import { QuoteSimulator } from './quote.simulator';

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  controllers: [QuoteController],
  providers: [QuoteUseCase, QuoteSimulator],
  exports: [QuoteUseCase],
})
export class QuoteModule {}
