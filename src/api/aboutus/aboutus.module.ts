import { Module } from '@nestjs/common';
import { AboutusApi } from './aboutus.api';
@Module({
  controllers: [AboutusApi]
})
export class AboutusModule {}
