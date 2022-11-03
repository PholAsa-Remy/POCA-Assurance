import {
  Controller,
  Get,
  Inject,
  Post,
  Render,
  Request,
  Session,
} from '@nestjs/common';
import { UserHomeService } from './userhome.service';
import { QuoteUseCase } from '../quote/usecase/quote.usecase';

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
    return { list_quote: list_quote };
  }

  @Get('modification/profile')
  @Render('modification_profile')
  async modification_profile() {}
}
