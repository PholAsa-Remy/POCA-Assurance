import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { BaseModule } from './base/base.module';
import { MailerModule } from '@nestjs-modules/mailer';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
    }),
    BaseModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [],
})
export class AppModule {}
