import { Body, Controller, Get, Inject, Post, Render } from '@nestjs/common';
import { CreateQuoteCommand } from '../api/quote/quote.command';
import { QuoteUsecase } from '../api/quote/quote.usecase';

@Controller('front')
export class QuoteController {
  @Inject(QuoteUsecase)
  private readonly quoteUsecase: QuoteUsecase;
  @Get()
  @Render('index')
  index() {
    return { message: 'Get your home insured within 3 minutes!' };
  }

  @Post('subscribe')
  @Render('quote')
  async subscribe(@Body() data: CreateQuoteCommand) {
    return await this.quoteUsecase.create(data);
  }

  @Get('list')
  @Render('list')
  async list() {
    const quotes = await this.quoteUsecase.findAll();
    return { quotes: quotes };
  }
}
