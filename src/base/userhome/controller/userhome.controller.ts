import {
  Controller,
  Get,
  Inject,
  Render,
  Request,
  Session,
} from '@nestjs/common';
import { UserHomeService } from '../service/userhome.service';
import { QuoteUseCase } from '../../quote/usecase/quote.usecase';
import { SinisterUseCase } from '../../reportsinister/usecase/sinister.usecase';

@Controller('userhome')
export class UserHomeController {
  @Inject(UserHomeService)
  public userHomeService: UserHomeService;
  @Inject(QuoteUseCase)
  public quoteUseCase: QuoteUseCase;
  @Inject(SinisterUseCase)
  public sinisterUseCase: SinisterUseCase;
  @Render('userhome')
  @Get()
  async index(@Request() req) {
    const promise_subscribe =
      this.quoteUseCase.findAllSubscribeQuotesFromCustomer(
        req.cookies.customerId,
      );
    const promise_unsubscribe =
      this.quoteUseCase.findAllUnsubscribeQuotesFromCustomer(
        req.cookies.customerId,
      );
    const promise_sinister = this.sinisterUseCase.findAllSinisterFromUser(
      req.cookies.customerId,
    );
    const [subscribe, unsubscribe, list_sinister] = await Promise.all([
      promise_subscribe,
      promise_unsubscribe,
      promise_sinister,
    ]);

    return {
      subscribe_quote: subscribe,
      unsubscribe_quote: unsubscribe,
      list_sinister: list_sinister,
    };
  }

  @Get('modification/profile')
  @Render('modification_profile')
  async modification_profile() {
    return {
      message: "This is the user's profile modification page",
    };
  }
}
