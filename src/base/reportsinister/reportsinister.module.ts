import { Module } from '@nestjs/common';
import { reportSinisterController } from './controller/reportsinister.controller';
import { SinisterUseCase } from './usecase/sinister.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sinister } from './entity/sinister.entity';
import { QuoteModule } from '../quote/quote.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sinister]), QuoteModule],
  controllers: [reportSinisterController],
  providers: [SinisterUseCase],
  exports: [SinisterUseCase],
})
export class reportsinisterModule {}
