import { Test } from '@nestjs/testing';
import { UserHomeController } from './userhome.controller';
import { UserHomeService } from '../service/userhome.service';
import { QuoteUseCase } from '../../quote/usecase/quote.usecase';
import { SinisterUseCase } from '../../reportsinister/usecase/sinister.usecase';

describe('UserHomeController', () => {
  let userHomeController: UserHomeController;
  let userHomeService: UserHomeService;
  let quoteUseCase: QuoteUseCase;
  let sinisterUseCase: SinisterUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserHomeController],
      providers: [
        UserHomeService,
        QuoteUseCase,
        SinisterUseCase,
        {
          provide: QuoteUseCase,
          useValue: {
            get: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: SinisterUseCase,
          useValue: {
            get: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            findAllSinisterFromUser: jest.fn(),
            findAllSinisterFromQuote: jest.fn(),
          },
        },
      ],
    }).compile();
    sinisterUseCase = moduleRef.get<SinisterUseCase>(SinisterUseCase);
    quoteUseCase = moduleRef.get<QuoteUseCase>(QuoteUseCase);
    userHomeService = moduleRef.get<UserHomeService>(UserHomeService);
    userHomeController = moduleRef.get<UserHomeController>(UserHomeController);
  });

  it('should be defined', () => {
    expect(quoteUseCase).toBeDefined();
    expect(sinisterUseCase).toBeDefined();
  });
});
