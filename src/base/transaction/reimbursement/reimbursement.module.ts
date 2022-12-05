import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReimbursementController } from './controller/reimbursement.controller';
import { Reimbursement } from './entity/reimbursement.entity';
import { ReimbursementUseCase } from './usecase/reimbursement.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Reimbursement])],
  controllers: [ReimbursementController],
  providers: [ReimbursementUseCase],
  exports: [ReimbursementUseCase, TypeOrmModule.forFeature([Reimbursement])],
})
export class ReimbursementModule {}
