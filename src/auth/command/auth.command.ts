import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class userInformation {
  @IsNotEmpty()
  @IsString()
  public access_token: string;

  @IsNotEmpty()
  @IsNumber()
  public id: number;

  @IsNotEmpty()
  @IsString()
  public username: string;

  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public address: string;

  @IsNotEmpty()
  @IsString()
  public phoneNumber: string;
}
