import { Body, Controller, Get, Inject, Post, Render, Session } from "@nestjs/common";
import { CreatePaymentCommand } from '../command/payment.command';
import { PaymentUseCase } from '../usecase/payment.useCase';
import { Payment } from "../entity/payment.entity";

@Controller('payment')
export class PaymentController {
  @Inject(PaymentUseCase)
  private readonly paymentUseCase: PaymentUseCase;

  @Get()
  @Render('payment')
  async paymentForm() {
    return {
      message: 'Please enter your card information.'
    };
  }

  @Get('list')
  @Render('payment_list')
  async list(@Session() session: Record<string, any>) {
    const payments = await this.paymentUseCase.findAllPaymentsFromCustomer(session.customerId);
    return { payments: payments };
  }

  @Post('create')
  @Render('payment')
  async createPayment(
    @Body() payment: CreatePaymentCommand,
    @Session() session: Record<string, any>
  ) : Promise<Payment>  {

    const createdPayment = await this.paymentUseCase.create(
      payment,
      session.customerId
    );

    return createdPayment;
  }
}
