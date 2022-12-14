import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { UUID } from '../../../../shared/type';

export class CreateReimbursementCommand {
  @IsString()
  @IsNotEmpty()
  public sinisterId: UUID;

  @IsNumberString()
  @IsNotEmpty()
  public amount: number;
}
