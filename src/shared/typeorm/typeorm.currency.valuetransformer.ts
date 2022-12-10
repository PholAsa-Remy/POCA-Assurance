import * as currency from 'currency.js';
import { ValueTransformer } from 'typeorm';

export const GALACTIC_CREDIT = (value) => currency(value, { symbol: 'GC' });

export const currencyTransformer: ValueTransformer = {
  from(value: string): currency {
    return GALACTIC_CREDIT(value);
  },
  to(value: currency): string {
    return value.value.toString();
  },
};
