import { Test } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { QuoteUseCase } from '../../quote/usecase/quote.usecase';

describe('Payment', () => {
  let paymentController: PaymentController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        QuoteUseCase,
        {
          provide: QuoteUseCase,
          useValue: {
            get: jest.fn(),
            subscribeQuote: jest.fn(),
          },
        },
      ],
    }).compile();

    paymentController = moduleRef.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(paymentController).toBeDefined();
  });
});
