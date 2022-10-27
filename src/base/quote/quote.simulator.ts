import { Injectable } from '@nestjs/common';
import { SimulateQuoteCommand } from './quote.command';

@Injectable()
export class QuoteSimulator {
  public async simulateQuote(body: SimulateQuoteCommand): Promise<string> {
    let simulatedQuote = 'Quote generated</br>';
    if (body.ageSpaceship > 40) {
      simulatedQuote += '1000';
    } else {
      simulatedQuote += '500';
    }
    simulatedQuote += ' galactic credit/month</br>';
    switch (body.lightspeed) {
      case 'regular': {
        simulatedQuote += '59';
        break;
      }
      case 'exceptional': {
        simulatedQuote += '70';
        break;
      }
      case 'nohyperdrive': {
        simulatedQuote += '48';
        break;
      }
      default: {
        simulatedQuote += '0';
        break;
      }
    }
    simulatedQuote += '% coverage on all moderate damage';
    return simulatedQuote;
  }
}
