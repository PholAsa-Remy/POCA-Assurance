import { Body, Controller, Get, Inject, Post, Render, Request} from "@nestjs/common";
import { UserhomeService } from './userhome.service';
import { QuoteUsecase } from '../../api/quote/quote.usecase';
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

  @Get('modification/profile')
  @Render('modification_profile')
  async modification_profile() {
    return {
      username: this.userhomeService.users[0].username,
      mail: this.userhomeService.users[0].mail,
    };
  }

  @Render('userhome')
  @Post()
  async index_modification_profile(@Request() req) {
    this.userhomeService.modification_profile(
      req.body.username as string,
      req.body.email as string,
    );
    const list_quote = await this.quoteUsecase.findAll();
    const data = {
      message: 'HELLO ' + this.userhomeService.users[0].username,
      profile:
        '<h2>Your profile : </h2>' +
        'Your name : ' +
        this.userhomeService.users[0].username +
        '<br> Your mail : ' +
        this.userhomeService.users[0].mail,
    };
    return { data: data, list_quote: list_quote };
  }
}
