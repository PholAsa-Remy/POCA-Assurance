import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendSinisterReportCommand {

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public subject: string;

  @IsString()
  @IsNotEmpty()
  public message: string;
}
