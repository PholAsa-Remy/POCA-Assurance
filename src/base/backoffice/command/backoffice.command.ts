import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class RefundCommand {
  @IsNotEmpty()
  @IsString()
  public sinisterId: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  public amount: number;
}
