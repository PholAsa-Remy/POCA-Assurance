import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ParseBoolean } from '../../../shared/decorators/parse.boolean';

export class CreateQuoteCommand {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsEmail()
  public email: string;
}

export class SimulateQuoteCommand {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  public ageSpaceship: number;

  @IsNotEmpty()
  @IsString()
  public lightspeed: string;

  @IsNotEmpty()
  @ParseBoolean()
  @IsBoolean()
  public outerRimTravel: boolean;

  @IsNotEmpty()
  @ParseBoolean()
  @IsBoolean()
  public strandedOuterRim: boolean;
}

export class SimulatedQuoteCommand {
  public baseMonthlyPrice: number;

  public damageToThirdParty: { included: boolean; deductible: number };

  public damageToSelf: { included: boolean; deductible: number };

  public strandedOuterRimGuarantee: {
    included: boolean;
    supplementMonthlyPrice: number;
  };
}
