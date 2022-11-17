import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateSinisterReportCommand {

  @IsNumber()
  @IsNotEmpty()
  public quoteId: number;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public accidentDate: Date;
}
