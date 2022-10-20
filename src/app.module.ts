import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteController } from './front/quote.controller';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { ApiModule } from './api/api.module';
import { QuoteModule } from './api/quote/quote.module';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { AuthApi } from "./api/auth/auth.api";

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ApiModule,
    QuoteModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [QuoteController,AuthApi],
  providers: [],
})
export class AppModule {}
