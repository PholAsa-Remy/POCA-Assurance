import { Module } from '@nestjs/common';
import { UserHomeModule } from './userhome/userhome.module';
import { QuoteModule } from './quote/quote.module';
import { CustomerModule } from './customer/customer.module';
import { AboutUsModule } from './aboutus/aboutus.module';
import { ContactModule } from './contact/contact.module';
import { PaymentModule } from "./payment/payment.module";
import { reportsinisterModule } from './reportsinister/reportsinister.module';


@Module({
  imports: [
    UserHomeModule,
    QuoteModule,
    CustomerModule,
    AboutUsModule,
    ContactModule,
    PaymentModule,
    reportsinisterModule
  ],
  controllers: [],
})
export class BaseModule {}
