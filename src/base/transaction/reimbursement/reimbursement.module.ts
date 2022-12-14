import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReimbursementController } from './controller/reimbursement.controller';
import { Reimbursement } from './entity/reimbursement.entity';
import { ReimbursementUseCase } from './usecase/reimbursement.usecase';
import { reportsinisterModule } from '../../../base/reportsinister/reportsinister.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reimbursement]), reportsinisterModule],
  controllers: [ReimbursementController],
  providers: [ReimbursementUseCase],
  exports: [ReimbursementUseCase, TypeOrmModule.forFeature([Reimbursement])],
})
export class ReimbursementModule {}
