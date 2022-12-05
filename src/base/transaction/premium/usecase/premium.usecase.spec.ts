import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PremiumUseCase } from './premium.usecase';
import { Premium } from '../entity/premium.entity';
import { GALACTIC_CREDIT } from '../../../../shared/typeorm/typeorm.currency.valuetransformer';
import { CreatePremiumCommandWithSetDate } from '../command/premium.command';

describe('PremiumUseCase', () => {
  let premiumUseCase: PremiumUseCase;
  let premiumRepository: Repository<Premium>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        PremiumUseCase,
        {
          provide: getRepositoryToken(Premium),
          useClass: Repository,
        },
      ],
    }).compile();

    premiumUseCase = module.get<PremiumUseCase>(PremiumUseCase);
    premiumRepository = module.get<Repository<Premium>>(
      getRepositoryToken(Premium),
    );
  });

  it('should be defined', () => {
    expect(premiumUseCase).toBeDefined();
  });

  describe('findAll', () => {
    it('it should return 2 items', async () => {
      jest.spyOn(premiumRepository, 'find').mockResolvedValueOnce(ITEMS);
      const result = await premiumUseCase.findAll();
      expect(result.length).toEqual(2);
    });
    it('it must generate an error, findAll return an error', async () => {
      jest.spyOn(premiumRepository, 'find').mockImplementation(() => {
        throw new Error('async error');
      });
      try {
        await premiumUseCase.findAll();
      } catch (err) {
        expect(err.message).toContain('async error');
      }
    });
  });

  describe('findOneById', () => {
    it('it should return 1 items', async () => {
      jest
        .spyOn(premiumRepository, 'findOneBy')
        .mockResolvedValueOnce(ITEMS[1]);
      const result = await premiumUseCase.findOneById('b');
      expect(result).toHaveProperty('id', 'b');
    });
  });

  describe('registerMonthlyPremiums', () => {
    it('it should have to 12 items', async () => {
      jest
        .spyOn(premiumUseCase, 'createWithSetDate')
        .mockImplementation((body: CreatePremiumCommandWithSetDate) => {
          const premium: Premium = new Premium();
          premium.amount = body.amount;
          premium.date = body.date;
          return new Promise((resolve) => {
            resolve(premium);
          });
        });
      const result = await premiumUseCase.registerMonthlyPremiums('a', 1);
      expect(result.length).toEqual(12);
    });
  });
});

const ITEMS: Premium[] = [
  {
    id: 'a',
    amount: GALACTIC_CREDIT(1),
    date: new Date(),
    quoteId: 'a',
    quote: null,
  },
  {
    id: 'b',
    amount: GALACTIC_CREDIT(1),
    date: new Date(),
    quoteId: 'a',
    quote: null,
  },
];
