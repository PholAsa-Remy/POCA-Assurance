import { Injectable } from '@nestjs/common';
import {
  SimulatedQuoteCommand,
  SimulateQuoteCommand,
} from '../command/quote.command';

@Injectable()
export class QuoteSimulator {
  public async simulateQuote(
    body: SimulateQuoteCommand,
  ): Promise<SimulatedQuoteCommand> {
    const simulatedQuote = new SimulatedQuoteCommand();

    simulatedQuote.baseMonthlyPrice = 300;
    simulatedQuote.damageToSelf = { included: false, deductible: 0 };
    simulatedQuote.damageToThirdParty = { included: false, deductible: 0 };
    simulatedQuote.strandedOuterRimGuarantee = {
      included: false,
      supplementMonthlyPrice: 0,
    };

    if (body.strandedOuterRim) {
      simulatedQuote.strandedOuterRimGuarantee.included = true;
      if (body.outerRimTravel) {
        simulatedQuote.strandedOuterRimGuarantee.supplementMonthlyPrice = 100;
      } else {
        simulatedQuote.strandedOuterRimGuarantee.supplementMonthlyPrice = 40;
      }
    }

    simulatedQuote.damageToSelf.included = true;
    if (body.ageSpaceship > 50) {
      simulatedQuote.damageToSelf.deductible = 1000;
    } else {
      simulatedQuote.damageToSelf.deductible = 450;
    }

    simulatedQuote.damageToThirdParty.included = true;
    if (body.lightspeed == 'nohyperdrive') {
      simulatedQuote.damageToThirdParty.deductible = 300;
    } else if (body.lightspeed == 'regular') {
      simulatedQuote.damageToThirdParty.deductible = 600;
    } else if (body.lightspeed == 'exceptional') {
      simulatedQuote.damageToThirdParty.deductible = 400;
    }

    return simulatedQuote;
  }
}
