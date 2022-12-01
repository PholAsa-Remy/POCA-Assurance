import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsDate,
  isDate,
} from 'class-validator';

export class CreateSinisterReportCommand {
  @IsString()
  @IsNotEmpty()
  public quoteId: string;

  @IsString()
  @IsNotEmpty()
  public sinisterMessage: string;

  @IsNotEmpty()
  public sinisterDate: Date;
}
