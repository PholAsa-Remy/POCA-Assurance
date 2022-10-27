import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CustomerUseCase } from '../useCase/customer.usecase';
import { Customer } from '../entity/customer.entity';
import {
  CreateCustomerCommand,
  UpdateCustomerCommand,
} from '../command/customer.command';

@Controller('customer')
export class CustomerController {
  @Inject(CustomerUseCase)
  private readonly customerUseCase: CustomerUseCase;

  @Get('')
  public async getAll(): Promise<Customer[]> {
    return await this.customerUseCase.findAll();
  }

  @Get('id/:id')
  public async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Customer> {
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
  public async create(@Body() quote: CreateCustomerCommand): Promise<Customer> {
    return await this.customerUseCase.create(quote);
  }

  @Post('update')
  public async update(@Body() quote: UpdateCustomerCommand): Promise<Customer> {
    return await this.customerUseCase.update(quote);
  }
}
