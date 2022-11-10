import { Module } from '@nestjs/common';
import { reportsinisterController } from './controller/reportsinister.controller';

@Module({
  controllers: [reportsinisterController],
})
export class reportsinisterModule {}
