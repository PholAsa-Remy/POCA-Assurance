import { Module } from '@nestjs/common';
import { reportsinisterController } from './controller/reportsinister.controller';
/* istanbul ignore next */
@Module({
  controllers: [reportsinisterController],
})
export class reportsinisterModule {}
