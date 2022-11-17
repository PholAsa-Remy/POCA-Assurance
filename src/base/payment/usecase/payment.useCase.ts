import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentCommand } from '../command/payment.command';
import { Payment } from '../entity/payment.entity';

@Injectable()
export class PaymentUseCase {
  @InjectRepository(Payment)
  private readonly repository: Repository<Payment>;

  public async get(id: number): Promise<Payment> {
    return await this.repository.findOneBy({ id });
  }

  public async findAll(): Promise<Payment[]> {
    return await this.repository.find();
  }

  public async findAllPaymentsFromCustomer(customerId: number): Promise<Payment[]> {
    return await this.repository.findBy({ customerId });
  }

  public async create(
    body: CreatePaymentCommand,
    customerId: number,
  ): Promise<Payment> {
    const payment: Payment = new Payment();
    payment.price = body.price;
    payment.customerId = customerId;
    return await this.repository.save(payment);
  }
}
