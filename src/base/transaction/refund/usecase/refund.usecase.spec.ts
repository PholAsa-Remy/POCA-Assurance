import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefundUseCase } from './refund.usecase';
import { Refund } from '../entity/refund.entity';
import { GALACTIC_CREDIT } from '../../../../shared/typeorm/typeorm.currency.valuetransformer';

describe('RefundUseCase', () => {
  let refundUseCase: RefundUseCase;
  let refundRepository: Repository<Refund>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        RefundUseCase,
        {
          provide: getRepositoryToken(Refund),
          useClass: Repository,
        },
      ],
    }).compile();

    refundUseCase = module.get<RefundUseCase>(RefundUseCase);
    refundRepository = module.get<Repository<Refund>>(
      getRepositoryToken(Refund),
    );
  });

  it('should be defined', () => {
    expect(refundUseCase).toBeDefined();
  });

  describe('findAll', () => {
    it('it should return 2 items', async () => {
      jest.spyOn(refundRepository, 'find').mockResolvedValueOnce(ITEMS);
      const result = await refundUseCase.findAll();
      expect(result.length).toEqual(2);
    });
    it('it must generate an error, findAll return an error', async () => {
      jest.spyOn(refundRepository, 'find').mockImplementation(() => {
        throw new Error('async error');
      });
      try {
        await refundUseCase.findAll();
      } catch (err) {
        expect(err.message).toContain('async error');
      }
    });
  });

  describe('findOneById', () => {
    it('it should return 1 items', async () => {
      jest.spyOn(refundRepository, 'findOneBy').mockResolvedValueOnce(ITEMS[1]);
      const result = await refundUseCase.findOneById('b');
      expect(result).toHaveProperty('id', 'b');
    });
  });
});

const ITEMS: Refund[] = [
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
