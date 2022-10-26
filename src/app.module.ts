import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteController } from './front/quote.controller';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { ApiModule } from './api/api.module';
import { QuoteModule } from './api/quote/quote.module';
import { UserhomeModule } from './front/userhome/userhome.module';
import { UserhomeController } from './front/userhome/userhome.controller';
import { AuthModule } from './api/auth/auth.module';
import { CustomerModule } from './api/customer/customer.module';
import { AuthApi } from './api/auth/auth.api';
import { CustomerController } from './api/customer/controller/customer.controller';
import{AboutusModule} from "./api/aboutus/aboutus.module" ;

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ApiModule,
    QuoteModule,
    UserhomeModule,
    AuthModule,
    CustomerModule,
  ],
  controllers: [
    QuoteController,
    UserhomeController,
    AuthApi,
    CustomerController,
    AboutusModule
  ],
  providers: [],
})
export class AppModule {}
