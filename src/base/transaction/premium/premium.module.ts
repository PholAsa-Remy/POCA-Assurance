import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PremiumController } from './controller/premium.controller';
import { Premium } from './entity/premium.entity';
import { PremiumUseCase } from './usecase/premium.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Premium])],
  controllers: [PremiumController],
  providers: [PremiumUseCase],
  exports: [PremiumUseCase, TypeOrmModule.forFeature([Premium])],
})
export class PremiumModule {}
