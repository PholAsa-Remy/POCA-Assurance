import { Test, TestingModule } from '@nestjs/testing';
import { QuoteSimulator } from './quote.simulator';
import {
  SimulatedQuoteCommand,
  SimulateQuoteCommand,
} from '../command/quote.command';

const SIMULATE_PARAMETERS: {
  input: SimulateQuoteCommand;
  expectedResult: SimulatedQuoteCommand;
}[] = [
  {
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
  },
  {
    input: {
      ageSpaceship: 55,
      lightspeed: 'nohyperdrive',
      outerRimTravel: false,
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
        deductible: 1000,
      },
      strandedOuterRimGuarantee: {
        included: true,
        supplementMonthlyPrice: 40,
      },
    },
  },
];

describe('QuoteSimulator', () => {
  let quoteSimulator: QuoteSimulator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [QuoteSimulator],
    }).compile();
    quoteSimulator = module.get<QuoteSimulator>(QuoteSimulator);
  });

  it('should be defined', () => {
    expect(quoteSimulator).toBeDefined();
  });

  describe.each(SIMULATE_PARAMETERS)('simulateQuote', (parameters) => {
    it('it should return propoer simulated quote according to simulator logic', async () => {
      const result = await quoteSimulator.simulateQuote(parameters.input);
      expect(result.baseMonthlyPrice).toEqual(
        parameters.expectedResult.baseMonthlyPrice,
      );
      expect(result.damageToThirdParty.included).toEqual(
        parameters.expectedResult.damageToThirdParty.included,
      );
      expect(result.damageToThirdParty.deductible).toEqual(
        parameters.expectedResult.damageToThirdParty.deductible,
      );
      expect(result.damageToSelf.included).toEqual(
        parameters.expectedResult.damageToSelf.included,
      );
      expect(result.damageToSelf.deductible).toEqual(
        parameters.expectedResult.damageToSelf.deductible,
      );
      expect(result.strandedOuterRimGuarantee.included).toEqual(
        parameters.expectedResult.strandedOuterRimGuarantee.included,
      );
      expect(result.strandedOuterRimGuarantee.supplementMonthlyPrice).toEqual(
        parameters.expectedResult.strandedOuterRimGuarantee
          .supplementMonthlyPrice,
      );
    });
  });
});
