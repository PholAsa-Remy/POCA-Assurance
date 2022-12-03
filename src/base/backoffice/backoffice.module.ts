import { BackOfficeController } from './controller/backoffice.controller';
import { Module } from '@nestjs/common';
import { reportsinisterModule } from '../reportsinister/reportsinister.module';

@Module({
  controllers: [BackOfficeController],
  providers: [],
  exports: [],
  imports: [reportsinisterModule],
})
export class BackOfficeModule {}
