import { QuoteController } from './quote.controller';
import { QuoteUseCase } from '../usecase/quote.usecase';
import { Test } from '@nestjs/testing';
import { QuoteSimulator } from '../simulator/quote.simulator';

describe('QuoteController', () => {
  let quoteController: QuoteController;
  let quoteUseCase: QuoteUseCase;
  let quoteSimulator: QuoteSimulator;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [
        QuoteUseCase,
        QuoteSimulator,
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

    quoteUseCase = moduleRef.get<QuoteUseCase>(QuoteUseCase);
    quoteSimulator = moduleRef.get<QuoteSimulator>(QuoteSimulator);
    quoteController = moduleRef.get<QuoteController>(QuoteController);
  });

  describe('probes', () => {
    it('should return "up"', async () => {
      const result = 'up';
      await expect(quoteController.probes()).resolves.toBe(result);
    });
  });

  describe('simulateForm', () => {
    it('should return a message"', async () => {
      expect.assertions(1);
      await expect(quoteController.simulateForm()).resolves.toHaveProperty(
        'message',
        'Answer a few questions a get a first quote simulation for your spaceship.',
      );
    });
  });
});
