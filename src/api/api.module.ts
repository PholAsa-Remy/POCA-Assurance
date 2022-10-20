import { Module } from '@nestjs/common';
import { QuoteModule } from './quote/quote.module';
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [QuoteModule, AuthModule],
})
export class ApiModule {}
