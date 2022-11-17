import { Module } from '@nestjs/common';
import { PaymentController } from './controller/payment.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentUseCase } from "./usecase/payment.useCase";
import { Payment } from "./entity/payment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentController],
  providers: [PaymentUseCase],
  exports: [PaymentUseCase],
})
export class PaymentModule {}
