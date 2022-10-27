import { Module } from '@nestjs/common';
import { UserHomeService } from './userhome.service';
import { UserHomeController } from './userhome.controller';
import { QuoteModule } from '../quote/quote.module';

@Module({
  providers: [UserHomeService],
  controllers: [UserHomeController],
  exports: [UserHomeService],
  imports: [QuoteModule],
})
export class UserHomeModule {}
