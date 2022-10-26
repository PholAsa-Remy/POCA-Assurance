import { Module } from '@nestjs/common';
import { QuoteModule } from './quote/quote.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { AboutusModule } from "./aboutus/aboutus.module"
@Module({
  imports: [QuoteModule, AuthModule, CustomerModule,AboutusModule],
})
export class ApiModule {}
