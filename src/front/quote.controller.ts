import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { CreateQuoteCommand } from '../api/quote/quote.command';
import { QuoteUsecase } from '../api/quote/quote.usecase';

@Controller()
export class QuoteController {
  @Inject(QuoteUsecase)
  private readonly quoteUsecase: QuoteUsecase;
  @Get()
  @Render('index')
  index() {
    return { message: 'Get your home insured within 3 minutes!' };
  }

  @Post('/subscribe')
  @Redirect('/list')
  subscribe(@Body() data: CreateQuoteCommand) {
    this.quoteUsecase.create(data);
  }

  @Get('/list')
  @Render('list')
  async list() {
    const quotes = await this.quoteUsecase.findAll();
    return { quotes: quotes };
  }
}
