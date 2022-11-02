import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Render,
} from '@nestjs/common';
import {
  CreateQuoteCommand,
  SimulateQuoteCommand,
} from '../command/quote.command';
import { Quote } from '../entity/quote.entity';
import { QuoteUseCase } from '../usecase/quote.usecase';
import { QuoteSimulator } from '../simulator/quote.simulator';

@Controller('quote')
export class QuoteController {
  @Inject(QuoteUseCase)
  private readonly quoteUseCase: QuoteUseCase;
  @Inject(QuoteSimulator)
  private readonly quoteSimulator: QuoteSimulator;

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
  @Render('quote')
  async subscribe(@Body() quote: CreateQuoteCommand) {
    return await this.quoteUseCase.create(quote);
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
}
