import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { PremiumUseCase } from '../usecase/premium.usecase';
import { Premium } from '../entity/premium.entity';
import { CreatePremiumCommand } from '../command/premium.command';

@Controller('premium')
export class PremiumController {
  @Inject(PremiumUseCase)
  private readonly premiumUseCase: PremiumUseCase;

  @Get('')
  async getAll(): Promise<Premium[]> {
    return await this.premiumUseCase.findAll();
  }

  @Get('id/:id')
  async getById(@Param('id') id: string): Promise<Premium> {
    return await this.premiumUseCase.findOneById(id);
  }

  @Post('create')
  async create(@Body() body: CreatePremiumCommand): Promise<Premium> {
    return await this.premiumUseCase.create(body);
  }
}
