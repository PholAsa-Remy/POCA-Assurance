import { Module } from '@nestjs/common';
import { UserHomeService } from './service/userhome.service';
import { UserHomeController } from './controller/userhome.controller';
import { QuoteModule } from '../quote/quote.module';
import { reportsinisterModule } from '../reportsinister/reportsinister.module';

@Module({
  providers: [UserHomeService],
  controllers: [UserHomeController],
  exports: [UserHomeService],
  imports: [QuoteModule, reportsinisterModule],
})
export class UserHomeModule {}
