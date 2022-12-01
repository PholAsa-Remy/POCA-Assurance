import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Redirect,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import {
  CreateQuoteCommand,
  DeleteQuoteCommand, RenewalContractCommand,
  SimulatedQuoteCommand,
  SimulateQuoteCommand,
  SubscribeQuoteCommand
} from "../command/quote.command";
import { Quote } from '../entity/quote.entity';
import { QuoteUseCase } from '../usecase/quote.usecase';
import { QuoteSimulator } from '../simulator/quote.simulator';
import { MailerService } from '@nestjs-modules/mailer';
import { PdfService } from '../../pdf/service/pdf.service';
import { CustomerUseCase } from '../../customer/useCase/customer.usecase';
import { join } from 'path';
import { UUID } from '../../../shared/type';
import { DeleteResult } from 'typeorm';
import { Request, Response } from 'express';
import { SpaceshipClass } from '../../../shared/valueobjects/SpaceshipClass';
import { SpaceshipModel } from '../../../shared/valueobjects/SpaceshipModel';
import { Planet } from '../../../shared/valueobjects/Planet';

@Controller('quote')
export class QuoteController {
  @Inject(QuoteUseCase)
  private readonly quoteUseCase: QuoteUseCase;
  @Inject(QuoteSimulator)
  private readonly quoteSimulator: QuoteSimulator;
  @Inject(MailerService)
  private readonly mailerService: MailerService;
  @Inject(PdfService)
  private readonly pdfService: PdfService;
  @Inject(CustomerUseCase)
  private readonly customerUseCase: CustomerUseCase;

  @Get('probes')
  public async probes(): Promise<string> {
    return 'up';
  }

  @Get('simulate')
  @Render('simulate')
  async simulateForm(): Promise<{
    message: string;
    spaceshipClasses: SpaceshipClass[];
    spaceshipModelsFighter: SpaceshipModel[];
    spaceshipModelsCruiserBattleship: SpaceshipModel[];
    spaceshipModelsShuttleCargo: SpaceshipModel[];
    planets: Planet[];
  }> {
    return {
      message:
        'Answer a few questions a get a first quote simulation for your spaceship.',
      spaceshipClasses: QuoteSimulator.SPACESHIP_CLASSES,
      spaceshipModelsFighter: QuoteSimulator.SPACESHIP_MODELS_FIGHTER,
      spaceshipModelsCruiserBattleship:
        QuoteSimulator.SPACESHIP_MODELS_CRUISER_BATTLESHIP,
      spaceshipModelsShuttleCargo:
        QuoteSimulator.SPACESHIP_MODELS_SHUTTLE_CARGO,
      planets: QuoteSimulator.PLANETS,
    };
  }

  @Post('simulate')
  @Render('simulate')
  async computeSimulation(@Body() data: SimulateQuoteCommand): Promise<{
    message: string;
    simulatedQuote: SimulatedQuoteCommand;
    spaceshipClasses: SpaceshipClass[];
    spaceshipModelsFighter: SpaceshipModel[];
    spaceshipModelsCruiserBattleship: SpaceshipModel[];
    spaceshipModelsShuttleCargo: SpaceshipModel[];
    planets: Planet[];
  }> {
    const simulatedQuote = await this.quoteSimulator.simulateQuote(data);
    return {
      message:
        'Answer a few questions a get a first quote simulation for your spaceship.',
      simulatedQuote: simulatedQuote,
      spaceshipClasses: QuoteSimulator.SPACESHIP_CLASSES,
      spaceshipModelsFighter: QuoteSimulator.SPACESHIP_MODELS_FIGHTER,
      spaceshipModelsCruiserBattleship:
        QuoteSimulator.SPACESHIP_MODELS_CRUISER_BATTLESHIP,
      spaceshipModelsShuttleCargo:
        QuoteSimulator.SPACESHIP_MODELS_SHUTTLE_CARGO,
      planets: QuoteSimulator.PLANETS,
    };
  }

  @Post('subscribe')
  async subscribe(
    @Body() body: SubscribeQuoteCommand,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Quote> {
    const customerPromise = this.customerUseCase.findOneById(
      req.cookies.customerId,
    );
    const quotePromise = this.quoteUseCase.get(body.id);
    const [customer, quote] = await Promise.all([
      customerPromise,
      quotePromise,
    ]);
    this.pdfService.generateContract(customer, quote);
    this.sendConfirmationSubscriptionMail(req.cookies, quote);
    res.redirect(`/payment/${quote.id}`);
    return quote;
  }

  @Post('create')
  @Redirect('back')
  async create(
    @Body() body: CreateQuoteCommand,
    @Req() req: Request,
  ): Promise<Quote> {
    return await this.quoteUseCase.create(body, req.cookies.customerId);
  }

  @Post('delete')
  @Redirect('back')
  async delete(@Body() body: DeleteQuoteCommand): Promise<DeleteResult> {
    return await this.quoteUseCase.delete(body.id);
  }

  @Post('createAndSubscribe')
  async createAndSubscribe(
    @Body() body: CreateQuoteCommand,
    @Req() req: Request,
  ): Promise<Quote> {
    const customerPromise = this.customerUseCase.findOneById(
      req.cookies.customerId,
    );
    const quotePromise = this.quoteUseCase.create(body, req.cookies.customerId);
    const [customer, createdQuote] = await Promise.all([
      customerPromise,
      quotePromise,
    ]);
    this.pdfService.generateContract(customer, createdQuote);
    this.sendConfirmationSubscriptionMail(req.cookies, createdQuote);
    return createdQuote;
  }

  @Get('list')
  @Render('list')
  async list(): Promise<{ quotes: Quote[] }> {
    const quotes = await this.quoteUseCase.findAll();
    return { quotes };
  }

  @Get(':id')
  public async get(@Param('id') id: UUID): Promise<Quote> {
    return await this.quoteUseCase.get(id);
  }

  private sendConfirmationSubscriptionMail(
    cookies: Record<string, any>,
    quote: Quote,
  ): void {
    this.mailerService.sendMail({
      to: cookies.email,
      from: '"Galaxy Support" <kevin.dang01@proton.me>',
      subject: 'Your new contract',
      text: `Hi, we are glad that you want subscribe to our insurance. \n
      Please find in attached file your contract. \n
      You need to sign it and provides us a RIB here : http://52.47.117.181/payment/${quote.id} \n
      please find here a resume of your policy : \n 
      Contract ID: ${quote.id} \n 
      Base price : ${quote.basePrice} \n 
      Deduction damage from third party : ${quote.deductionDamageFromThirdParty} \n
      Deduction damage to self : ${quote.deductionDamageToSelf} \n
      Price breakdown and rescue : ${quote.priceBreakDownAndRescue}`,
      attachments: [
        {
          path: join(
            './',
            `customers/${cookies.customerId}/${quote.id}`,
            `${cookies.customerId}_${quote.id}.pdf`,
          ),
          filename: `${cookies.customerId}_${quote.id}.pdf`,
          contentDisposition: 'attachment',
        },
      ],
    });
  }

  @Post('renewal')
  @Redirect('back')
  async switchRenewalStatement(
    @Body() body: RenewalContractCommand,
  ): Promise<Quote> {
    return await this.quoteUseCase.switchRenewalStatement(body.id);
  }
}
