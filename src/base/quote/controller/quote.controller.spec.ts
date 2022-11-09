import { QuoteController } from './quote.controller';
import { QuoteUseCase } from '../usecase/quote.usecase';
import { Test } from '@nestjs/testing';
import { QuoteSimulator } from '../simulator/quote.simulator';
import { Quote } from '../entity/quote.entity';
import {
  SimulatedQuoteCommand,
  SimulateQuoteCommand,
} from '../command/quote.command';
import { MailerService } from '@nestjs-modules/mailer';

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
        MailerService,
        {
          provide: QuoteUseCase,
          useValue: {
            get: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
        {
          provide: QuoteSimulator,
          useValue: {
            simulateQuote: jest.fn(),
          },
        },
      ],
    }).compile();

    quoteUseCase = moduleRef.get<QuoteUseCase>(QuoteUseCase);
    quoteSimulator = moduleRef.get<QuoteSimulator>(QuoteSimulator);
    quoteController = moduleRef.get<QuoteController>(QuoteController);
  });

  it('should be defined', () => {
    expect(quoteController).toBeDefined();
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

  describe('list', () => {
    it('it should return 2 items', async () => {
      jest
        .spyOn(quoteUseCase, 'findAll')
        .mockResolvedValueOnce([new Quote(), new Quote()]);
      const result = await quoteController.list();
      expect(result.quotes.length).toEqual(2);
    });
  });

  describe('computeSimulation', () => {
    it('it should return the appropriate message', async () => {
      jest
        .spyOn(quoteSimulator, 'simulateQuote')
        .mockResolvedValueOnce(SIMULATE_PARAMETERS.expectedResult);
      const result = await quoteController.computeSimulation(
        SIMULATE_PARAMETERS.input,
      );
      expect(result.message).toEqual(
        'Answer a few questions a get a first quote simulation for your spaceship.',
      );
    });
  });
});

const SIMULATE_PARAMETERS: {
  input: SimulateQuoteCommand;
  expectedResult: SimulatedQuoteCommand;
} = {
  input: {
    ageSpaceship: 30,
    lightspeed: 'nohyperdrive',
    outerRimTravel: true,
    strandedOuterRim: true,
  },
  expectedResult: {
    baseMonthlyPrice: 300,
    damageToThirdParty: {
      included: true,
      deductible: 300,
    },
    damageToSelf: {
      included: true,
      deductible: 450,
    },
    strandedOuterRimGuarantee: {
      included: true,
      supplementMonthlyPrice: 100,
    },
  },
};
