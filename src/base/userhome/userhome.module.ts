import { Module } from '@nestjs/common';
import { UserHomeService } from './service/userhome.service';
import { UserHomeController } from './controller/userhome.controller';
import { QuoteModule } from '../quote/quote.module';

@Module({
  providers: [UserHomeService],
  controllers: [UserHomeController],
  exports: [UserHomeService],
  imports: [QuoteModule],
})
export class UserHomeModule {}
