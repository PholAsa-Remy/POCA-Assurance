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
      spaceshipClass: 'Fighter',
      spaceshipModel: 'TIE Fighter',
      planet: 'Alderaan',
    },
    expectedResult: {
      baseMonthlyPrice: 326,
      damageToThirdParty: {
        included: true,
        deductible: 349,
      },
      damageToSelf: {
        included: true,
        deductible: 509,
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
      spaceshipClass: 'Fighter',
      spaceshipModel: 'TIE Fighter',
      planet: 'Alderaan',
    },
    expectedResult: {
      baseMonthlyPrice: 326,
      damageToThirdParty: {
        included: true,
        deductible: 349,
      },
      damageToSelf: {
        included: true,
        deductible: 1130,
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

  describe.each(SIMULATE_PARAMETERS)(
    'parameterized simulateQuote',
    (parameters) => {
      it('it should return proper simulated quote according to simulator logic', async () => {
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
    },
  );

  describe('simulateQuote fine grained tests', () => {
    it('should take regular lightspeed usage into account', async () => {
      const input: SimulateQuoteCommand = {
        ageSpaceship: 30,
        lightspeed: 'regular',
        outerRimTravel: true,
        strandedOuterRim: true,
        spaceshipClass: 'Fighter',
        spaceshipModel: 'TIE Fighter',
        planet: 'Alderaan',
      };
      const result = await quoteSimulator.simulateQuote(input);
      expect(result.damageToThirdParty.deductible).toEqual(698);
    });
    it('should take exceptional lightspeed usage into account', async () => {
      const input: SimulateQuoteCommand = {
        ageSpaceship: 30,
        lightspeed: 'exceptional',
        outerRimTravel: true,
        strandedOuterRim: true,
        spaceshipClass: 'Fighter',
        spaceshipModel: 'TIE Fighter',
        planet: 'Alderaan',
      };
      const result = await quoteSimulator.simulateQuote(input);
      expect(result.damageToThirdParty.deductible).toEqual(465);
    });
    it('should take cruiser/battleship class into account', async () => {
      const input: SimulateQuoteCommand = {
        ageSpaceship: 30,
        lightspeed: 'nohyperdrive',
        outerRimTravel: true,
        strandedOuterRim: true,
        spaceshipClass: 'Cruiser/Battleship',
        spaceshipModel: 'Imperial Star Destroyer',
        planet: 'Alderaan',
      };
      const result = await quoteSimulator.simulateQuote(input);
      expect(result.damageToThirdParty.deductible).toEqual(338);
      expect(result.damageToSelf.deductible).toEqual(495);
      expect(result.baseMonthlyPrice).toEqual(326);
    });
  });
});
