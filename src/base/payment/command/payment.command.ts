import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SendPaymentCommand {
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
