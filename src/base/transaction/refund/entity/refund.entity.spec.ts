import { Refund } from './refund.entity';
import { GALACTIC_CREDIT } from '../../../../shared/typeorm/typeorm.currency.valuetransformer';

describe('Refund Entity', () => {
  it('should be defined', () => {
    expect(new Refund()).toBeDefined();
  });
  it('should init amount properly', () => {
    const transaction: Refund = {
      id: 'a',
      amount: GALACTIC_CREDIT(1),
      date: new Date(),
      quoteId: 'a',
      quote: null,
    };
    expect(transaction.amount.value).toEqual(1);
  });
  it('should output properly', () => {
    const transaction: Refund = {
      id: 'a',
      amount: GALACTIC_CREDIT(1),
      date: new Date(),
      quoteId: 'a',
      quote: null,
    };
    expect(transaction.amount.format()).toEqual('GC1.00');
  });
});
