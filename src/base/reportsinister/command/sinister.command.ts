import {
  IsNotEmpty,
  IsString,
  IsNumberString,
  IsDateString,
} from 'class-validator';
import { UUID } from 'src/shared/type';

export class CreateSinisterReportBody {
  @IsString()
  @IsNotEmpty()
  public sinisterMessage: string;

  @IsNumberString()
  @IsNotEmpty()
  public damageValue: number;

  @IsNotEmpty()
  @IsDateString()
  public sinisterDate: Date;
}

export class CreateSinisterReportCommand {
  @IsString()
  @IsNotEmpty()
  public quoteId: UUID;

  @IsString()
  @IsNotEmpty()
  public sinisterMessage: string;

  @IsNotEmpty()
  @IsNumberString()
  public damageValue: number;

  @IsNotEmpty()
  @IsDateString()
  public sinisterDate: Date;
}
