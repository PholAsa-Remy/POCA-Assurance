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
import { RefundCommand } from '../command/backoffice.command';

@Controller('backoffice')
export class BackOfficeController {
  @Inject(SinisterUseCase)
  public sinisterUseCase: SinisterUseCase;

  @Get('')
  @Render('backoffice')
  async renderBackOffice(): Promise<{
    message: string;
    sinisters: Sinister[];
  }> {
    const sinisters = await this.sinisterUseCase.findAll();
    return {
      message: 'Welcome to the back office',
      sinisters,
    };
  }

  @Post('refund')
  @Render('backoffice')
  @Redirect('back')
  async refund(@Body() body: RefundCommand): Promise<{
    message: string;
    sinisters: Sinister[];
  }> {
    console.log(body);
    const sinisters = await this.sinisterUseCase.findAll();
    return {
      message: 'Welcome to the back office',
      sinisters,
    };
  }
}
