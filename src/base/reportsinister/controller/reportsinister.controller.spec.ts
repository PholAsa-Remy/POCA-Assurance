import { Test, TestingModule } from '@nestjs/testing';
import { QuoteUseCase } from '../../quote/usecase/quote.usecase';
import { SinisterUseCase } from '../usecase/sinister.usecase';
import { reportSinisterController } from './reportsinister.controller';
import { Request, Response } from 'express';
describe('reportsinisterController', () => {
  let controller: reportSinisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [reportSinisterController],
      providers: [
        SinisterUseCase,
        {
          provide: SinisterUseCase,
          useValue: {
            get: jest.fn(),
            findAll: jest.fn(),
            findAllSinisterFromUser: jest.fn(),
            findAllSinisterFromQuote: jest.fn(),
            create: jest.fn(),
          },
        },
        QuoteUseCase,
        {
          provide: QuoteUseCase,
          useValue: {
            get: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<reportSinisterController>(reportSinisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

 /* it('should return a message for contact form"', async () => {
    await expect(
      controller.reportSinisterForm(new Request({},{},{},{},),{},'fakeuiid'),
    ).resolves.toHaveProperty(
      'message',
      'Please fill this form to report us a sinister',
    );
    await expect(
      controller.reportSinisterForm({},{},'fakeuiid'),
    ).resolves.toHaveProperty('notification', '');
  });*/
});
