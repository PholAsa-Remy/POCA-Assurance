import { Test } from '@nestjs/testing';
import { PaymentController } from './payment.controller';

describe('Payment', () => {
  let paymentController: PaymentController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PaymentController],
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
