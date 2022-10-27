import { Controller, Get, Inject, Post, Render, Request } from '@nestjs/common';
import { UserHomeService } from './userhome.service';
import { QuoteUseCase } from '../quote/quote.usecase';

@Controller('userhome')
export class UserHomeController {
  @Inject(UserHomeService)
  public userHomeService: UserHomeService;
  @Inject(QuoteUseCase)
  public quoteUseCase: QuoteUseCase;
  @Render('userhome')
  @Get()
  async index() {
    const list_quote = await this.quoteUseCase.findAll();
    const data = {
      message: 'HELLO ' + this.userHomeService.users[0].username,
      profile:
        '<h2>Your profile :</h2>' +
        'Your name : ' +
        this.userHomeService.users[0].username +
        '<br> Your mail : ' +
        this.userHomeService.users[0].mail,
    };
    return { data: data, list_quote: list_quote };
  }

  @Get('modification/profile')
  @Render('modification_profile')
  async modification_profile() {
    return {
      username: this.userHomeService.users[0].username,
      mail: this.userHomeService.users[0].mail,
    };
  }

  @Render('userhome')
  @Post()
  async index_modification_profile(@Request() req) {
    await this.userHomeService.modification_profile(
      req.body.username as string,
      req.body.email as string,
    );
    const list_quote = await this.quoteUseCase.findAll();
    const data = {
      message: 'HELLO ' + this.userHomeService.users[0].username,
      profile:
        '<h2>Your profile : </h2>' +
        'Your name : ' +
        this.userHomeService.users[0].username +
        '<br> Your mail : ' +
        this.userHomeService.users[0].mail,
    };
    return { data: data, list_quote: list_quote };
  }
}
