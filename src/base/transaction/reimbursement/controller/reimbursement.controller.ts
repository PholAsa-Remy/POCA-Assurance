import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ReimbursementUseCase } from '../usecase/reimbursement.usecase';
import { Reimbursement } from '../entity/reimbursement.entity';
import { CreateReimbursementCommand } from '../command/reimbursement.command';

@Controller('reimbursement')
export class ReimbursementController {
  @Inject(ReimbursementUseCase)
  private readonly reimbursementUseCase: ReimbursementUseCase;

  @Get('')
  async getAll(): Promise<Reimbursement[]> {
    return await this.reimbursementUseCase.findAll();
  }

  @Get('id/:id')
  async getById(@Param('id') id: string): Promise<Reimbursement> {
    return await this.reimbursementUseCase.findOneById(id);
  }

  @Post('create')
  async create(
    @Body() body: CreateReimbursementCommand,
  ): Promise<Reimbursement> {
    return await this.reimbursementUseCase.create(body);
  }
}
