import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentCommand {
  @IsNumber()
  @IsNotEmpty()
  public price: number;

  @IsString()
  @IsNotEmpty()
  public card_number: string;

  @IsString()
  @IsNotEmpty()
  public cvv: string;

  @IsString()
  @IsNotEmpty()
  public owner: string;

  @IsString()
  @IsNotEmpty()
  public month_exp: string;

  @IsString()
  @IsNotEmpty()
  public year_exp: string;
}
