import {
  Body,
  Controller,
  Get,
  Post,
  Render
} from "@nestjs/common";
import { SendPaymentCommand } from '../command/payment.command';

@Controller('payment')
export class PaymentController {

  @Get()
  @Render('payment')
  async paymentForm() {
    return {
      message:
        'Please enter your card information.',
    };
  }

  @Post('send')
  @Render('payment')
  async sendMail(@Body() data: SendPaymentCommand) {
    return {
      message: 'Payment succeeded !',
    };
  }
}
