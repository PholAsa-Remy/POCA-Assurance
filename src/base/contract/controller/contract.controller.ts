import {
  Body,
  Controller,
  Inject,
  Post,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { DownloadContractCommand } from '../command/contract.command';
import { Request, Response } from 'express';
import * as fs from 'fs';
import {
  DeleteQuoteCommand,
  TerminateContractCommand,
} from '../../quote/command/quote.command';
import { Quote } from '../../quote/entity/quote.entity';
import { QuoteUseCase } from '../../quote/usecase/quote.usecase';
import { RefundUseCase } from '../../transaction/refund/usecase/refund.usecase';
import { PremiumUseCase } from '../../transaction/premium/usecase/premium.usecase';
import { GALACTIC_CREDIT } from '../../../shared/typeorm/typeorm.currency.valuetransformer';

/* istanbul ignore next */
@Controller('contract')
export class ContractController {
  @Inject(QuoteUseCase)
  private readonly quoteUseCase: QuoteUseCase;
  @Inject(RefundUseCase)
  private readonly refundUseCase: RefundUseCase;
  @Inject(PremiumUseCase)
  private readonly premiumUseCase: PremiumUseCase;

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
    const quote = await this.quoteUseCase.unsubscribeQuote(quoteId);
    const amountRefund =
      quote.paymentPeriod === 'annually'
        ? quote.basePrice * 12
        : quote.basePrice;
    await this.refundUseCase.create({
      amount: GALACTIC_CREDIT(amountRefund),
      quoteId: quoteId,
    });
    await this.premiumUseCase.deleteAllAfterNow({
      id: quoteId,
    });
    return quote;
  }

  @Post('terminate')
  @Redirect('back')
  async terminateContract(
    @Body() body: TerminateContractCommand,
  ): Promise<boolean> {
    const contract = await this.quoteUseCase.get(body.id);
    if (contract.paymentPeriod === 'monthly') {
      await this.terminateMonthlyContract(contract);
      return true;
    } else if (contract.paymentPeriod === 'annually') {
      await this.terminateAnnualContract(contract);
      return true;
    }
    return false;
  }

  private async terminateAnnualContract(contract: Quote) {
    const dateNow = new Date();
    const monthDiff = (d1, d2) => {
      let months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth();
      months += d2.getMonth();
      return months <= 0 ? 0 : months;
    };
    const monthsRemain = monthDiff(dateNow, contract.expiredAt);
    await this.refundUseCase.create({
      amount: GALACTIC_CREDIT(monthsRemain * contract.basePrice),
      quoteId: contract.id,
    });
    await this.quoteUseCase.unsubscribeQuote(contract.id);
  }

  private async terminateMonthlyContract(contract: Quote) {
    const futurePremiums = await this.premiumUseCase.findFuturePremiumByQuote({
      id: contract.id,
    });
    const premiumsAmount = futurePremiums.map((premium) => premium.amount);
    const refundAmount = premiumsAmount.reduce(
      (accumulator, premiumsAmount) => accumulator.add(premiumsAmount),
      GALACTIC_CREDIT(0),
    );
    await Promise.all([
      this.refundUseCase.create({
        amount: GALACTIC_CREDIT(refundAmount),
        quoteId: contract.id,
      }),
      this.premiumUseCase.deleteAllAfterNow({
        id: contract.id,
      }),
    ]);
    await this.quoteUseCase.unsubscribeQuote(contract.id);
  }
}
