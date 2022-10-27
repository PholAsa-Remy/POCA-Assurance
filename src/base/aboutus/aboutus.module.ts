import { Module } from '@nestjs/common';
import { AboutUsController } from './aboutus.controller';

@Module({
  controllers: [AboutUsController],
})
export class AboutUsModule {}
