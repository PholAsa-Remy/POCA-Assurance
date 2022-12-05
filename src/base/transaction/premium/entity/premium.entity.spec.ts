import { Premium } from './premium.entity';
import { GALACTIC_CREDIT } from '../../../../shared/typeorm/typeorm.currency.valuetransformer';

describe('Premium Entity', () => {
  it('should be defined', () => {
    expect(new Premium()).toBeDefined();
  });
  it('should init amount properly', () => {
    const transaction: Premium = {
      id: 'a',
      amount: GALACTIC_CREDIT(1),
      date: new Date(),
      quoteId: 'a',
      quote: null,
    };
    expect(transaction.amount.value).toEqual(1);
  });
  it('should output properly', () => {
    const transaction: Premium = {
      id: 'a',
      amount: GALACTIC_CREDIT(1),
      date: new Date(),
      quoteId: 'a',
      quote: null,
    };
    expect(transaction.amount.format()).toEqual('GC1.00');
  });
});
