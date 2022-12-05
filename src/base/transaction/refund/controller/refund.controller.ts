import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { RefundUseCase } from '../usecase/refund.usecase';
import { Refund } from '../entity/refund.entity';
import { CreateRefundCommand } from '../command/refund.command';

@Controller('refund')
export class RefundController {
  @Inject(RefundUseCase)
  private readonly refundUseCase: RefundUseCase;

  @Get('')
  async getAll(): Promise<Refund[]> {
    return await this.refundUseCase.findAll();
  }

  @Get('id/:id')
  async getById(@Param('id') id: string): Promise<Refund> {
    return await this.refundUseCase.findOneById(id);
  }

  @Post('create')
  async create(@Body() body: CreateRefundCommand): Promise<Refund> {
    return await this.refundUseCase.create(body);
  }
}
