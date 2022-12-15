import { Module } from '@nestjs/common';
import { UserHomeService } from './service/userhome.service';
import { UserHomeController } from './controller/userhome.controller';
import { QuoteModule } from '../quote/quote.module';
import { reportsinisterModule } from '../reportsinister/reportsinister.module';
import { ReimbursementModule } from '../transaction/reimbursement/reimbursement.module';
import { PremiumUseCase } from '../transaction/premium/usecase/premium.usecase';
import { PremiumModule } from '../transaction/premium/premium.module';

@Module({
  providers: [UserHomeService, PremiumUseCase],
  controllers: [UserHomeController],
  exports: [UserHomeService],
  imports: [
    QuoteModule,
    reportsinisterModule,
    ReimbursementModule,
    PremiumModule,
  ],
})
export class UserHomeModule {}
