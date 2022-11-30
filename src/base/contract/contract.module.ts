import { Module } from '@nestjs/common';
import { ContractController } from './controller/contract.controller';

@Module({
  imports: [],
  controllers: [ContractController],
  providers: [],
  exports: [],
})
export class ContractModule {}
