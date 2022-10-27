import { Customer } from './customer.entity';

describe('Customer', () => {
  it('should be defined', () => {
    expect(new Customer()).toBeDefined();
  });
});
