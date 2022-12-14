import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';

import { SinisterUseCase } from '../../reportsinister/usecase/sinister.usecase';
import { Sinister } from '../../reportsinister/entity/sinister.entity';
import { CreateReimbursementCommand } from 'src/base/transaction/reimbursement/command/reimbursement.command';
import { ReimbursementUseCase } from 'src/base/transaction/reimbursement/usecase/reimbursement.usecase';
import { Reimbursement } from 'src/base/transaction/reimbursement/entity/reimbursement.entity';

@Controller('backoffice')
export class BackOfficeController {
  @Inject(SinisterUseCase)
  public sinisterUseCase: SinisterUseCase;

  @Inject(ReimbursementUseCase)
  public reimbursementUseCase: ReimbursementUseCase;

  @Get('')
  @Render('backoffice')
  async renderBackOffice(): Promise<{
    message: string;
    sinisters: Sinister[];
  }> {
    const sinisters =
      await this.reimbursementUseCase.findNotReimbursedSinister();
    return {
      message: 'Welcome to the back office',
      sinisters,
    };
  }

  @Post('refund')
  @Redirect('back')
  async refund(
    @Body() body: CreateReimbursementCommand,
  ): Promise<Reimbursement> {
    const sinisters =
      await this.reimbursementUseCase.findNotReimbursedSinister();
    return await this.reimbursementUseCase.create(body);
  }
}
