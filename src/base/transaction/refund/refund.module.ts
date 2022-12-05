import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefundController } from './controller/refund.controller';
import { Refund } from './entity/refund.entity';
import { RefundUseCase } from './usecase/refund.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Refund])],
  controllers: [RefundController],
  providers: [RefundUseCase],
  exports: [RefundUseCase, TypeOrmModule.forFeature([Refund])],
})
export class RefundModule {}
