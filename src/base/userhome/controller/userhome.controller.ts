import { Controller, Get, Inject, Render, Request } from '@nestjs/common';
import { UserHomeService } from '../service/userhome.service';
import { QuoteUseCase } from '../../quote/usecase/quote.usecase';
import { SinisterUseCase } from '../../reportsinister/usecase/sinister.usecase';
import { ReimbursementUseCase } from '../../transaction/reimbursement/usecase/reimbursement.usecase';
import { PremiumUseCase } from '../../transaction/premium/usecase/premium.usecase';

@Controller('userhome')
export class UserHomeController {
  @Inject(UserHomeService)
  public userHomeService: UserHomeService;

  @Inject(QuoteUseCase)
  public quoteUseCase: QuoteUseCase;

  @Inject(SinisterUseCase)
  public sinisterUseCase: SinisterUseCase;

  @Inject(ReimbursementUseCase)
  public reimbursementUseCase: ReimbursementUseCase;

  @Inject(PremiumUseCase)
  public premiumUseCase: PremiumUseCase;

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
    const promise_reimbursment =
      this.reimbursementUseCase.findAllReimbursementFromUser(
        req.cookies.customerId,
      );

    const promise_premium = this.premiumUseCase.findAllPremiumFromUser(
      req.cookies.customerId,
    );

    const [
      subscribe,
      unsubscribe,
      list_sinister,
      list_reimbursement,
      list_premium,
    ] = await Promise.all([
      promise_subscribe,
      promise_unsubscribe,
      promise_sinister,
      promise_reimbursment,
      promise_premium,
    ]);

    return {
      subscribe_quote: subscribe,
      unsubscribe_quote: unsubscribe,
      list_sinister: list_sinister,
      list_reimbursement: list_reimbursement,
      list_premium: list_premium,
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
