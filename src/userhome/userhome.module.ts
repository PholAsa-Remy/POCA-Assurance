import { Module } from '@nestjs/common';
import { UserhomeService } from './userhome.service';
import { UserhomeController } from './userhome.controller';
import { QuoteModule } from '../api/quote/quote.module';

@Module({
  providers: [UserhomeService],
  controllers: [UserhomeController],
  exports: [UserhomeService],
  imports: [QuoteModule],
})
export class UserhomeModule {}
