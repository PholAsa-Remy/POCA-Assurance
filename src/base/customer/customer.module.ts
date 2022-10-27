import { Module } from '@nestjs/common';
import { CustomerUseCase } from './useCase/customer.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { CustomerController } from './controller/customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerUseCase],
  exports: [CustomerUseCase],
})
export class CustomerModule {}
