import { BackOfficeController } from './controller/backoffice.controller';
import { Module } from '@nestjs/common';
import { reportsinisterModule } from '../reportsinister/reportsinister.module';
import { ReimbursementModule } from '../transaction/reimbursement/reimbursement.module';

@Module({
  controllers: [BackOfficeController],
  providers: [],
  exports: [],
  imports: [reportsinisterModule, ReimbursementModule],
})
export class BackOfficeModule {}
