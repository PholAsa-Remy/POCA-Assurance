import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

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
}
