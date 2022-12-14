import { Module } from '@nestjs/common';
import { UserHomeService } from './service/userhome.service';
import { UserHomeController } from './controller/userhome.controller';
import { QuoteModule } from '../quote/quote.module';
import { reportsinisterModule } from '../reportsinister/reportsinister.module';
import { ReimbursementModule } from '../transaction/reimbursement/reimbursement.module';

@Module({
  providers: [UserHomeService],
  controllers: [UserHomeController],
  exports: [UserHomeService],
  imports: [QuoteModule, reportsinisterModule, ReimbursementModule],
})
export class UserHomeModule {}
