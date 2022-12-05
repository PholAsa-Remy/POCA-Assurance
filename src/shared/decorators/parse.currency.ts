import { Transform } from 'class-transformer';
import { GALACTIC_CREDIT } from '../typeorm/typeorm.currency.valuetransformer';

export const ParseCurrency = () =>
  Transform(({ value }) => GALACTIC_CREDIT(value));
