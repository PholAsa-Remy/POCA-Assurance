import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteModule } from '../src/base/quote/quote.module';
import { TypeOrmConfigService } from '../src/shared/typeorm/typeorm.service';
import { getEnvPath } from '../src/common/helper/env.helper';
import { MailerModule } from '@nestjs-modules/mailer';

const envFilePath = getEnvPath(`${__dirname}/../src/common/envs`);

describe('QuoteController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
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
        QuoteModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/probes (GET)', async () => {
    return request(app.getHttpServer())
      .get('/quote/probes')
      .expect(200)
      .expect('up');
  });
});
