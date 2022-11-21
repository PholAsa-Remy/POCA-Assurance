import {
  Controller,
  Get,
  Inject,
  Post,
  Render,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PaymentUseCase } from '../usecase/payment.useCase';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('payment')
export class PaymentController {
  @Inject(PaymentUseCase)
  private readonly paymentUseCase: PaymentUseCase;

  @Get()
  @Render('payment')
  async paymentForm() {
    return {
      message: 'Please provide your payment information.',
    };
  }

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'contract', maxCount: 1 },
        { name: 'rib', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './upload',
          filename: (req, file, callback) => {
            console.log((req.session as any).customerId as string);
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const filename = `${uniqueSuffix}.pdf`;
            callback(null, filename);
          },
        }),
      },
    ),
  )
  async uploadFile(
    @UploadedFiles()
    files: {
      contract: Express.Multer.File[];
      rib: Express.Multer.File[];
    },
  ): Promise<{ contract: Express.Multer.File[]; rib: Express.Multer.File[] }> {
    console.log(files);
    return files;
  }
}
