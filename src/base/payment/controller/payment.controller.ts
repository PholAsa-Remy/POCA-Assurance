import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { QuoteUseCase } from '../../quote/usecase/quote.usecase';
import { Quote } from '../../quote/entity/quote.entity';
import { UUID } from '../../../shared/type';
import * as path from 'path';
import { Request, Response } from 'express';
import { CompleteSubscriptionCommand } from '../command/payment.command';
import { PremiumUseCase } from '../../transaction/premium/usecase/premium.usecase';
import { Premium } from '../../transaction/premium/entity/premium.entity';

@Controller('payment')
export class PaymentController {
  @Inject(QuoteUseCase)
  private readonly quoteUseCase: QuoteUseCase;

  @Inject(PremiumUseCase)
  private readonly premiumUseCase: PremiumUseCase;

  @Get('/:quoteId')
  async paymentForm(
    @Req() req: Request,
    @Res() res: Response,
    @Param('quoteId') quoteId: UUID,
  ): Promise<void> {
    try {
      const quote = await this.quoteUseCase.get(quoteId);
      const QuoteDoesntExistOrDoesntOwnByCurrentCustomerOrItIsAlreadyPaid =
        !quote ||
        (quote && quote.customerId !== req.cookies.customerId) ||
        quote.state === 'active';

      if (QuoteDoesntExistOrDoesntOwnByCurrentCustomerOrItIsAlreadyPaid) {
        return res.redirect('/userhome');
      }
      return res.render(`payment`, {
        message: 'Please provide your payment information.',
        quoteId: quoteId,
      });
    } catch (e) {
      console.log(e);
      return res.redirect('/userhome');
    }
  }

  /* istanbul ignore next */
  @Post('upload/:quoteId')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'contract', maxCount: 1 },
        { name: 'rib', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './customers',
          filename: (req, file, callback) => {
            const customerId: UUID = (req.cookies as any).customerId as string;
            const quoteId: UUID = req.params.quoteId as string;
            let filename: string;
            if (file.fieldname === 'contract') {
              const ext = path.extname(file.originalname);
              filename = `${customerId}/${quoteId}/${customerId}_${quoteId}_signed${ext}`;
            } else if (file.fieldname === 'rib') {
              const ext = path.extname(file.originalname);
              filename = `${customerId}/${quoteId}/${customerId}_${quoteId}_rib${ext}`;
            }
            callback(null, filename);
          },
        }),
      },
    ),
  )
  async uploadFile(
    @UploadedFiles()
    files: {
      contract: Express.Multer.File[];
      rib: Express.Multer.File[];
    },
    @Param('quoteId') quoteId: UUID,
    @Body() body: CompleteSubscriptionCommand,
    @Res() res: Response,
  ): Promise<{
    subscribedQuote: Quote;
    premiums: Premium[] | Premium;
    files: { contract: Express.Multer.File[]; rib: Express.Multer.File[] };
  }> {
    console.log(files);
    const subscribedQuote = await this.quoteUseCase.subscribeQuote(
      quoteId,
      body.paymentPeriod,
    );
    let premiums: Premium[] | Premium;
    if (subscribedQuote.paymentPeriod === 'monthly') {
      premiums = await this.premiumUseCase.registerMonthlyPremiums(
        subscribedQuote.id,
        subscribedQuote.basePrice,
      );
    } else if (subscribedQuote.paymentPeriod === 'annually') {
      premiums = await this.premiumUseCase.registerYearlyPremium(
        subscribedQuote.id,
        subscribedQuote.basePrice,
      );
    }
    res.redirect('/userhome');
    return { subscribedQuote, premiums, files };
  }
}
