import { Test } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentUseCase } from '../usecase/payment.useCase';

describe('Payment', () => {
  let paymentController: PaymentController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        PaymentUseCase,
        {
          provide: PaymentUseCase,
          useValue: {
            get: jest.fn(),
            findAll: jest.fn(),
            findAllPaymentsFromCustomer: jest.fn(),
            create: jest.fn()
          },
        },
      ]
    }).compile();

    paymentController = moduleRef.get<PaymentController>(PaymentController);
  });

  describe('paymentForm', () => {
    it('should return a message"', async () => {
      expect.assertions(1);
      await expect(paymentController.paymentForm()).resolves.toHaveProperty(
        'message',
        'Please enter your card information.',
      );
    });
  });

});
