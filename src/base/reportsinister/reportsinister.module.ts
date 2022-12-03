import { Module } from '@nestjs/common';
import { reportsinisterController } from './controller/reportsinister.controller';
import { SinisterUseCase } from './usecase/sinister.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sinister } from './entity/sinister.entity';
import { QuoteModule } from '../quote/quote.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sinister]), QuoteModule],
  controllers: [reportsinisterController],
  providers: [SinisterUseCase],
  exports: [SinisterUseCase],
})
export class reportsinisterModule {}
