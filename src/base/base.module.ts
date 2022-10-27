import { Module } from '@nestjs/common';
import { UserHomeModule } from './userhome/userhome.module';
import { QuoteModule } from './quote/quote.module';
import { CustomerModule } from './customer/customer.module';
import { AboutUsModule } from './aboutus/aboutus.module';

@Module({
  imports: [UserHomeModule, QuoteModule, CustomerModule, AboutUsModule],
})
export class BaseModule {}
