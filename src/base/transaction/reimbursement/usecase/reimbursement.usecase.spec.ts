import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReimbursementUseCase } from './reimbursement.usecase';
import { Reimbursement } from '../entity/reimbursement.entity';
import { GALACTIC_CREDIT } from '../../../../shared/typeorm/typeorm.currency.valuetransformer';

describe('ReimbursementUseCase', () => {
  let reimbursementUseCase: ReimbursementUseCase;
  let reimbursementRepository: Repository<Reimbursement>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ReimbursementUseCase,
        {
          provide: getRepositoryToken(Reimbursement),
          useClass: Repository,
        },
      ],
    }).compile();

    reimbursementUseCase =
      module.get<ReimbursementUseCase>(ReimbursementUseCase);
    reimbursementRepository = module.get<Repository<Reimbursement>>(
      getRepositoryToken(Reimbursement),
    );
  });

  it('should be defined', () => {
    expect(reimbursementUseCase).toBeDefined();
  });

  describe('findAll', () => {
    it('it should return 2 items', async () => {
      jest.spyOn(reimbursementRepository, 'find').mockResolvedValueOnce(ITEMS);
      const result = await reimbursementUseCase.findAll();
      expect(result.length).toEqual(2);
    });
    it('it must generate an error, findAll return an error', async () => {
      jest.spyOn(reimbursementRepository, 'find').mockImplementation(() => {
        throw new Error('async error');
      });
      try {
        await reimbursementUseCase.findAll();
      } catch (err) {
        expect(err.message).toContain('async error');
      }
    });
  });

  describe('findOneById', () => {
    it('it should return 1 items', async () => {
      jest
        .spyOn(reimbursementRepository, 'findOneBy')
        .mockResolvedValueOnce(ITEMS[1]);
      const result = await reimbursementUseCase.findOneById('b');
      expect(result).toHaveProperty('id', 'b');
    });
  });
});

const ITEMS: Reimbursement[] = [
  {
    id: 'a',
    amount: GALACTIC_CREDIT(1),
    date: new Date(),
    sinisterId: 'a',
    sinister: null,
  },
  {
    id: 'b',
    amount: GALACTIC_CREDIT(1),
    date: new Date(),
    sinisterId: 'a',
    sinister: null,
  },
];
