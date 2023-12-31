import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Redirect,
  Request,
} from '@nestjs/common';
import { CustomerUseCase } from '../useCase/customer.usecase';
import { Customer } from '../entity/customer.entity';
import {
  CreateCustomerCommand,
  UpdateCustomerCommand,
} from '../command/customer.command';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('customer')
export class CustomerController {
  @Inject(CustomerUseCase)
  private readonly customerUseCase: CustomerUseCase;

  @Inject(MailerService)
  private readonly mailerService: MailerService;

  @Get('')
  public async getAll(): Promise<Customer[]> {
    return await this.customerUseCase.findAll();
  }

  @Get('id/:id')
  public async getById(@Param('id') id: string): Promise<Customer> {
    return await this.customerUseCase.findOneById(id);
  }

  @Get('username/:username')
  public async getByUsername(
    @Param('username') username: string,
  ): Promise<Customer> {
    return await this.customerUseCase.findOneByName(username);
  }

  @Get('email/:email')
  public async getByEmail(@Param('email') email: string): Promise<Customer> {
    return await this.customerUseCase.findByEmail(email);
  }

  @Post()
  public async create(
    @Body() customer: CreateCustomerCommand,
  ): Promise<Customer> {
    const createdCustomer = await this.customerUseCase.create(customer);

    this.sendConfirmationNewAccountEmail(customer, createdCustomer);

    return createdCustomer;
  }

  @Post('update')
  @Redirect('/logout')
  public async update(
    @Body() customer: UpdateCustomerCommand,
    @Request() req,
  ): Promise<Customer> {
    return await this.customerUseCase.update(customer, req.cookies.customerId);
  }

  private sendConfirmationNewAccountEmail(
    customer: CreateCustomerCommand,
    createdCustomer: Customer,
  ): void {
    this.mailerService.sendMail({
      to: customer.email,
      from: '"Galaxy Support" <kevin.dang01@proton.me>',
      subject: 'Your new account on our platform',
      text: `Hi, we are glad that you join us \n
      Please find here all of your information : \n
      - Customer ID : ${createdCustomer.id} \n
      - Username : ${createdCustomer.username} \n
      - Address : ${createdCustomer.address} \n
      - Email : ${createdCustomer.email} \n
      - Phone number : ${createdCustomer.phoneNumber} \n
      You can now login at : http://52.47.117.181/auth/login \n
      And use our quote generator at : http://52.47.117.181/quote/simulate \n
      For any questions please join us at : http://52.47.117.181/contact \n
      `,
    });
  }
}
