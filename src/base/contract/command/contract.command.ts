import { IsNotEmpty, IsString } from 'class-validator';
import { UUID } from '../../../shared/type';

export class DownloadContractCommand {
  @IsNotEmpty()
  @IsString()
  public id: UUID;
}
