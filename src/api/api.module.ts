import { Module } from '@nestjs/common';
import { QuoteModule } from './quote/quote.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [QuoteModule, AuthModule, CustomerModule],
})
export class ApiModule {}
