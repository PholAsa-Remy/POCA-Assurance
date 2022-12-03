import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UUID } from '../../../shared/type';

export class CompleteSubscriptionCommand {
  @IsNotEmpty()
  @IsString()
  public paymentPeriod: 'annually' | 'monthly';
}
