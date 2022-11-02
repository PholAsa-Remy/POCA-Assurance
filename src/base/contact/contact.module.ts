import { Module } from '@nestjs/common';
import { ContactController } from './controller/contact.controller';

@Module({
  controllers: [ContactController],
})
export class ContactModule {}
