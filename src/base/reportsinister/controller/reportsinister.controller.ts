import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Render,
  Req,
  Session,
} from '@nestjs/common';
import { CreateSinisterReportCommand } from '../command/sinister.command';
import { SinisterUseCase } from '../usecase/sinister.usecase';
import { Request } from 'express';
import { MailerService } from '@nestjs-modules/mailer';
import { Sinister } from '../entity/sinister.entity';

@Controller('report_sinister')
export class reportsinisterController {
  @Inject(SinisterUseCase)
  private readonly sinisterUseCase: SinisterUseCase;

  @Get()
  @Render('reportsinister')
  async contactForm() {
    return {
      message: 'Please fill this form to report us a sinister',
      notification: '',
    };
  }

  @Post('report')
  @Render('reportsinister')
  async createReportSinister(@Body() sinister: CreateSinisterReportCommand) {
    try {
      await this.sinisterUseCase.create(sinister);
      return {
        message: 'Please fill this form to report us a sinister',
        notification: 'Your sinister was successfully reported !',
      };
    } catch {
      return {
        message: 'Please fill this form to report us a sinister',
        notification:
          "We're sorry, an error occured during your sinister reporting",
      };
    }
  }
}
