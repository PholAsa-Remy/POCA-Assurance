import { Module } from '@nestjs/common';
import { PdfService } from './service/pdf.service';

@Module({
  providers: [PdfService],
  controllers: [],
  exports: [PdfService],
})
export class PdfModule {}
