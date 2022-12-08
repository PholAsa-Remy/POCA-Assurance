import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { UUID } from '../../../../shared/type';
import currency from 'currency.js';
import { ParseCurrency } from '../../../../shared/decorators/parse.currency';

export class CreatePremiumCommand {
  @IsString()
  @IsNotEmpty()
  public quoteId: UUID;

  @IsString()
  @IsNotEmpty()
  @ParseCurrency()
  public amount: currency;
}

export class CreatePremiumCommandWithSetDate {
  @IsString()
  @IsNotEmpty()
  public quoteId: UUID;

  @IsString()
  @IsNotEmpty()
  @ParseCurrency()
  public amount: currency;

  @IsDate()
  @IsNotEmpty()
  public date: Date;
}

export class DeletePremiumAfterNowCommand {
  @IsNotEmpty()
  @IsString()
  public id: UUID;
}