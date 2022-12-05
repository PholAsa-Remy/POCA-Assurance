import { Reimbursement } from './reimbursement.entity';
import { GALACTIC_CREDIT } from '../../../../shared/typeorm/typeorm.currency.valuetransformer';

describe('Reimbursement Entity', () => {
  it('should be defined', () => {
    expect(new Reimbursement()).toBeDefined();
  });
  it('should init amount properly', () => {
    const transaction: Reimbursement = {
      id: 'a',
      amount: GALACTIC_CREDIT(1),
      date: new Date(),
      sinisterId: 'a',
      sinister: null,
    };
    expect(transaction.amount.value).toEqual(1);
  });
  it('should output properly', () => {
    const transaction: Reimbursement = {
      id: 'a',
      amount: GALACTIC_CREDIT(1),
      date: new Date(),
      sinisterId: 'a',
      sinister: null,
    };
    expect(transaction.amount.format()).toEqual('GC1.00');
  });
});
