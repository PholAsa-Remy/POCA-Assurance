import { Module } from '@nestjs/common';
import { AboutUsController } from './controller/aboutus.controller';

@Module({
  controllers: [AboutUsController],
})
export class AboutUsModule {}
