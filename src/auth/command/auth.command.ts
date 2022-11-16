import { IsNotEmpty, IsString } from 'class-validator';

export class userInformation {
  @IsNotEmpty()
  @IsString()
  public access_token: string;

  @IsNotEmpty()
  @IsString()
  public id: string;

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
