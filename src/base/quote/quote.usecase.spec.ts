import { QuoteUseCase } from './quote.usecase';
import { Quote } from './quote.entity';
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
      const result = await quoteUseCase.get(2);
      expect(result).toHaveProperty('id', 2);
    });
    it('it must generate an error, get return an error', async () => {
      jest.spyOn(quoteRepository, 'findOneBy').mockImplementation(() => {
        throw new Error('async error');
      });
      try {
        await quoteUseCase.get(3);
      } catch (err) {
        expect(err.message).toContain('async error');
      }
    });
  });
});

const ITEMS: Quote[] = [
  {
    id: 1,
    address: 'test',
    premium: 1,
    name: 'test',
    email: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    address: 'test',
    premium: 1,
    name: 'test',
    email: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
