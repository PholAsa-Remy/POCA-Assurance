import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
