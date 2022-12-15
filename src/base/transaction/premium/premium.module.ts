import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PremiumController } from './controller/premium.controller';
import { Premium } from './entity/premium.entity';
import { PremiumUseCase } from './usecase/premium.usecase';
import { QuoteModule } from '../../quote/quote.module';
import { QuoteUseCase } from '../../quote/usecase/quote.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Premium]), forwardRef(() => QuoteModule)],
  controllers: [PremiumController],
  providers: [PremiumUseCase, QuoteUseCase],
  exports: [PremiumUseCase, TypeOrmModule.forFeature([Premium])],
})
export class PremiumModule {}
