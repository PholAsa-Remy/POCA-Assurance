import { Controller, Get, Inject, Render } from '@nestjs/common';
import { UserhomeService } from './userhome.service';
import { CreateQuoteCommand } from '../api/quote/quote.command';
import { QuoteUsecase } from '../api/quote/quote.usecase';
@Controller('userhome')
export class UserhomeController {
  @Inject(UserhomeService)
  public userhomeService: UserhomeService;
  @Inject(QuoteUsecase)
  public quoteUsecase : QuoteUsecase;
  @Render('userhome')
  @Get()
  async index() {
    const list_quote = await this.quoteUsecase.findAll();
    const data = {
      message: 'HELLO ' + this.userhomeService.users[0].username,
      profile:
        '<h2>Your profile :</h2>' +
        'Your name : ' +
        this.userhomeService.users[0].username +
        '<br> Your mail : ' +
        this.userhomeService.users[0].mail,
    };
    return { data: data, list_quote: list_quote };
  }
}
