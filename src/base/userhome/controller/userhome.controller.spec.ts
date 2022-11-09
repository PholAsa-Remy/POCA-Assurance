import { Test } from '@nestjs/testing';
import { UserHomeController } from './userhome.controller';
import { UserHomeService } from '../service/userhome.service';
import { QuoteUseCase } from '../../quote/usecase/quote.usecase';

describe('UserHomeController', () => {
  let userHomeController: UserHomeController;
  let userHomeService: UserHomeService;
  let quoteUseCase: QuoteUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserHomeController],
      providers: [
        UserHomeService,
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

    quoteUseCase = moduleRef.get<QuoteUseCase>(QuoteUseCase);
    userHomeService = moduleRef.get<UserHomeService>(UserHomeService);
    userHomeController = moduleRef.get<UserHomeController>(UserHomeController);
  });

  it('should be defined', () => {
    expect(quoteUseCase).toBeDefined();
  });
});
