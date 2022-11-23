import { QuoteUseCase } from './quote.usecase';
import { Quote } from '../entity/quote.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('QuoteUseCase', () => {
  let quoteUseCase: QuoteUseCase;
  let quoteRepository: Repository<Quote>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        QuoteUseCase,
        {
          provide: getRepositoryToken(Quote),
          useClass: Repository,
        },
      ],
    }).compile();

    quoteUseCase = module.get<QuoteUseCase>(QuoteUseCase);
    quoteRepository = module.get<Repository<Quote>>(getRepositoryToken(Quote));
  });

  it('should be defined', () => {
    expect(quoteUseCase).toBeDefined();
  });

  describe('findAll', () => {
    it('it should return 2 items', async () => {
      jest.spyOn(quoteRepository, 'find').mockResolvedValueOnce(ITEMS);
      const result = await quoteUseCase.findAll();
      expect(result.length).toEqual(2);
    });
    it('it must generate an error, findAll return an error', async () => {
      jest.spyOn(quoteRepository, 'find').mockImplementation(() => {
        throw new Error('async error');
      });
      try {
        await quoteUseCase.findAll();
      } catch (err) {
        expect(err.message).toContain('async error');
      }
    });
  });

  describe('get', () => {
    it('it should return 1 items', async () => {
      jest.spyOn(quoteRepository, 'findOneBy').mockResolvedValueOnce(ITEMS[1]);
      const result = await quoteUseCase.get('b');
      expect(result).toHaveProperty('id', 'b');
    });
    it('it must generate an error, get return an error', async () => {
      jest.spyOn(quoteRepository, 'findOneBy').mockImplementation(() => {
        throw new Error('async error');
      });
      try {
        await quoteUseCase.get('c');
      } catch (err) {
        expect(err.message).toContain('async error');
      }
    });
  });

  describe('findAllQuotesFromCustomer', () => {
    it('it should return 2 items', async () => {
      jest.spyOn(quoteRepository, 'findBy').mockResolvedValueOnce(ITEMS);
      const result = await quoteUseCase.findAllQuotesFromCustomer('1');
      expect(result.length).toEqual(2);
    });
  });

  describe('findAllSubscribeQuotesFromCustomer', () => {
    it('it should return 1 items', async () => {
      jest.spyOn(quoteRepository, 'findBy').mockResolvedValueOnce(ITEMS);
      const result = await quoteUseCase.findAllSubscribeQuotesFromCustomer('1');
      expect(result.length).toEqual(2);
    });
  });

  describe('findAllUnsubscribeQuotesFromCustomer', () => {
    it('it should return 0 items', async () => {
      jest.spyOn(quoteRepository, 'findBy').mockResolvedValueOnce([]);
      const result = await quoteUseCase.findAllUnsubscribeQuotesFromCustomer(
        '1',
      );
      expect(result.length).toEqual(0);
    });
  });

  describe('findAllUnsubscribeQuotesFromCustomer', () => {
    it('it should return 0 items', async () => {
      jest.spyOn(quoteRepository, 'save').mockResolvedValueOnce(ITEMS[0]);
      const result = await quoteUseCase.create(
        {
          basePrice: 1,
          includeDamageFromThirdParty: true,
          deductionDamageFromThirdParty: 1,
          includeDamageToSelf: true,
          deductionDamageToSelf: 1,
          includeBreakDownAndRescue: true,
          priceBreakDownAndRescue: 1,
        },
        '1',
      );
      expect(result).toBeDefined();
    });
  });
});

const ITEMS: Quote[] = [
  {
    id: 'a',
    customer: null,
    customerId: '1',
    basePrice: 1,
    includeDamageFromThirdParty: true,
    deductionDamageFromThirdParty: 1,
    includeDamageToSelf: true,
    deductionDamageToSelf: 1,
    includeBreakDownAndRescue: true,
    priceBreakDownAndRescue: 1,
    isSubscribe: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'b',
    customer: null,
    customerId: '1',
    basePrice: 1,
    includeDamageFromThirdParty: true,
    deductionDamageFromThirdParty: 1,
    includeDamageToSelf: true,
    deductionDamageToSelf: 1,
    includeBreakDownAndRescue: true,
    priceBreakDownAndRescue: 1,
    isSubscribe: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
