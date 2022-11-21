import { Module } from '@nestjs/common';
import { PdfService } from './service/pdf.service';
import { QuoteModule } from '../quote/quote.module';

@Module({
  providers: [PdfService],
  controllers: [],
  exports: [PdfService],
})
export class PdfModule {}
