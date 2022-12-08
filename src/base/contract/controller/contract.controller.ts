import {Body, Controller, Inject, Post, Redirect, Req, Res} from '@nestjs/common';
import { DownloadContractCommand } from '../command/contract.command';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { DeleteQuoteCommand } from "../../quote/command/quote.command";
import {Quote} from "../../quote/entity/quote.entity";
import {QuoteUseCase} from "../../quote/usecase/quote.usecase";
import {RefundUseCase} from "../../transaction/refund/usecase/refund.usecase";
import {PremiumUseCase} from "../../transaction/premium/usecase/premium.usecase";
import {GALACTIC_CREDIT} from "../../../shared/typeorm/typeorm.currency.valuetransformer";

/* istanbul ignore next */
@Controller('contract')
export class ContractController {
  @Inject(QuoteUseCase)
  private readonly quoteUseCase: QuoteUseCase;
  @Inject(RefundUseCase)
  private readonly refundUseCase: RefundUseCase;
  @Inject (PremiumUseCase)
  private readonly premiumUseCase: PremiumUseCase

  @Post('download')
  async getFile(
    @Body() body: DownloadContractCommand,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const path = `customers/${req.cookies.customerId}/${body.id}/${req.cookies.customerId}_${body.id}_signed`;
    if (fs.existsSync(`${path}.pdf`)) {
      return res.download(`${path}.pdf`);
    }
    if (fs.existsSync(`${path}.png`)) {
      return res.download(`${path}.png`);
    }
    if (fs.existsSync(`${path}.jpg`)) {
      return res.download(`${path}.jpg`);
    }
    if (fs.existsSync(`${path}.jpeg`)) {
      return res.download(`${path}.jpeg`);
    }
  }

  @Post('renounce')
  @Redirect('back')
  async delete(@Body() body: DeleteQuoteCommand): Promise<Quote> {
    const quoteId = body.id;
    const quotePromise = await this.quoteUseCase.unsubscribeQuote(quoteId);
    const amountRefund = (quotePromise.paymentPeriod === 'annually' ) ? quotePromise.basePrice * 12 : quotePromise.basePrice;
    await this.refundUseCase.create({
      amount: GALACTIC_CREDIT(amountRefund),
      quoteId: quoteId
    });
    await this.premiumUseCase.deleteAllAfterNow({
      id: quoteId
    });
    return quotePromise;
  }
}
