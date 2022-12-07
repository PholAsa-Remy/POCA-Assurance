import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CreateSinisterReportBody,
  CreateSinisterReportCommand,
} from '../command/sinister.command';
import { SinisterUseCase } from '../usecase/sinister.usecase';
import { UUID } from 'src/shared/type';
import { QuoteUseCase } from '../../quote/usecase/quote.usecase';

@Controller('report_sinister')
export class reportSinisterController {
  @Inject(SinisterUseCase)
  private readonly sinisterUseCase: SinisterUseCase;

  @Inject(QuoteUseCase)
  private readonly quoteUseCase: QuoteUseCase;

  @Get('/:quoteId')
  async reportSinisterForm(
    @Req() req: Request,
    @Res() res: Response,
    @Param('quoteId') quoteId: UUID):Promise<void>{
      try {
        const quote = await this.quoteUseCase.get(quoteId);
        const QuoteDoesntExistOrDoesntOwnByCurrentCustomerOrItIsNotActive =
          !quote ||
          (quote && quote.customerId !== req.cookies.customerId) ||
          quote.state === 'inactive';
  
        if (QuoteDoesntExistOrDoesntOwnByCurrentCustomerOrItIsNotActive) {
          return res.redirect('/userhome');
        }
        return res.render(`reportsinister`, {
          message: 'Please fill this form to report us a sinister',
          notification: '',
          quote : quote
        });
      } catch (e) {
        console.log(e);
        return res.redirect('/userhome');
      }
  }

  @Post('report/:quoteId')
  @Render('reportsinister')
  async createReportSinister(
    @Param('quoteId') quoteId: UUID,
    @Body() sinister: CreateSinisterReportBody,
  ) {
    try {
      const sinisterCommand: CreateSinisterReportCommand =
        new CreateSinisterReportCommand();
      sinisterCommand.quoteId = quoteId;
      sinisterCommand.sinisterDate = sinister.sinisterDate;
      sinisterCommand.sinisterMessage = sinister.sinisterMessage;
      sinisterCommand.damageValue = sinister.damageValue;
      await this.sinisterUseCase.create(sinisterCommand);
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
