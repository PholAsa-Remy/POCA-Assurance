import { IsNotEmpty, IsString } from 'class-validator';
import { UUID } from '../../../../shared/type';
import currency from 'currency.js';
import { ParseCurrency } from '../../../../shared/decorators/parse.currency';

export class CreateReimbursementCommand {
  @IsString()
  @IsNotEmpty()
  public sinisterId: UUID;

  @IsString()
  @IsNotEmpty()
  @ParseCurrency()
  public amount: currency;
}
