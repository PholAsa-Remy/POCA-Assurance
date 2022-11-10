import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Render,
  Request,
  Session,
} from '@nestjs/common';
import { UserHomeService } from '../service/userhome.service';
import { QuoteUseCase } from '../../quote/usecase/quote.usecase';

@Controller('userhome')
export class UserHomeController {
  @Inject(UserHomeService)
  public userHomeService: UserHomeService;
  @Inject(QuoteUseCase)
  public quoteUseCase: QuoteUseCase;
  @Render('userhome')
  @Get()
  async index(@Session() session: Record<string, any>) {
    const promise_subscribe =
      this.quoteUseCase.findAllSubscribeQuotesFromCustomer(session.customerId);
    const promise_unsubscribe =
      this.quoteUseCase.findAllUnsubscribeQuotesFromCustomer(
        session.customerId,
      );
    const [subscribe, unsubscribe] = await Promise.all([
      promise_subscribe,
      promise_unsubscribe,
    ]);
    return { subscribe_quote: subscribe, unsubscribe_quote: unsubscribe };
  }

  @Get('modification/profile')
  @Render('modification_profile')
  async modification_profile() {
    return {
      message: "this is the user's profile modification page",
    };
  }
}
