import { Module } from '@nestjs/common';
import { PremiumModule } from './premium/premium.module';
import { ReimbursementModule } from './reimbursement/reimbursement.module';
import { RefundModule } from './refund/refund.module';

@Module({
  imports: [PremiumModule, ReimbursementModule, RefundModule],
  controllers: [],
  providers: [],
  exports: [PremiumModule, ReimbursementModule, RefundModule],
})
export class TransactionModule {}
