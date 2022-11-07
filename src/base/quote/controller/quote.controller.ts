import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Redirect,
  Render,
  Session,
} from '@nestjs/common';
import {
  CreateQuoteCommand,
  SimulateQuoteCommand,
} from '../command/quote.command';
import { Quote } from '../entity/quote.entity';
import { QuoteUseCase } from '../usecase/quote.usecase';
import { QuoteSimulator } from '../simulator/quote.simulator';
import { MailerService } from '@nestjs-modules/mailer';

interface SubscribeParams {
  id: number;
}

@Controller('quote')
export class QuoteController {
  @Inject(QuoteUseCase)
  private readonly quoteUseCase: QuoteUseCase;
  @Inject(QuoteSimulator)
  private readonly quoteSimulator: QuoteSimulator;
  @Inject(MailerService)
  private readonly mailerService: MailerService;

  @Get('probes')
  public async probes(): Promise<string> {
    return 'up';
  }

  @Get('simulate')
  @Render('simulate')
  async simulateForm() {
    return {
      message:
        'Answer a few questions a get a first quote simulation for your spaceship.',
    };
  }

  @Post('simulate')
  @Render('simulate')
  async computeSimulation(@Body() data: SimulateQuoteCommand) {
    const simulatedQuote = await this.quoteSimulator.simulateQuote(data);
    return {
      message:
        'Answer a few questions a get a first quote simulation for your spaceship.',
      simulatedQuote: simulatedQuote,
    };
  }

  @Post('subscribe')
  @Redirect('back')
  async subscribe(
    @Body() quote: SubscribeParams,
    @Session() session: Record<string, any>,
  ) {
    const subscribedQuote = await this.quoteUseCase.subscribeQuote(quote.id);

    this.sendConfirmationSubscriptionMail(session, subscribedQuote);

    return subscribedQuote;
  }

  @Post('create')
  @Redirect('back')
  async create(
    @Body() quote: CreateQuoteCommand,
    @Session() session: Record<string, any>,
  ) {
    const createdQuote = await this.quoteUseCase.create(
      quote,
      session.customerId,
    );

    if (createdQuote.isSubscribe)
      this.sendConfirmationSubscriptionMail(session, createdQuote);

    return createdQuote;
  }

  @Get('list')
  @Render('list')
  async list() {
    const quotes = await this.quoteUseCase.findAll();
    return { quotes: quotes };
  }

  @Get(':id')
  public async get(@Param('id', ParseIntPipe) id: number): Promise<Quote> {
    return await this.quoteUseCase.get(id);
  }

  private sendConfirmationSubscriptionMail(
    session: Record<string, any>,
    quote: Quote,
  ) {
    this.mailerService.sendMail({
      to: session.email,
      from: '"Galaxy Support" <kevin.dang01@proton.me>',
      subject: 'You have subscribe to a new insurance',
      text: `Hi, we are glad to know that you have subscribe to our insurance, 
      please find here a resume of your policy : \n 
      N°: ${quote.id} \n 
      Base price : ${quote.basePrice} \n 
      Deduction damage from third party : ${quote.deductionDamageFromThirdParty} \n
      Deduction damage to self : ${quote.deductionDamageToSelf} \n
      Price breakdown and rescue : ${quote.priceBreakDownAndRescue}`,
    });
  }
}
