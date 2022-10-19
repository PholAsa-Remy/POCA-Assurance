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
import { CreateQuoteCommand, SimulateQuoteCommand } from './quote.command';
import { Quote } from './quote.entity';
import { QuoteUsecase } from './quote.usecase';
import { QuoteSimulator } from './quote.simulator';

@Controller('quotes')
export class QuoteApi {
  @Inject(QuoteUsecase)
  private readonly quoteUsecase: QuoteUsecase;
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

  @Get(':id')
  public async get(@Param('id', ParseIntPipe) id: number): Promise<Quote> {
    return await this.quoteUsecase.get(id);
  }

  @Post()
  public async create(@Body() quote: CreateQuoteCommand): Promise<Quote> {
    return await this.quoteUsecase.create(quote);
  }
}
