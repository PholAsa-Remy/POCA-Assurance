import { Test, TestingModule } from '@nestjs/testing';
import { reportsinisterController } from './reportsinister.controller';
import { SinisterUseCase } from '../usecase/sinister.usecase';

describe('reportsinisterController', () => {
  let controller: reportsinisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //imports: [reportsinisterModule],
      controllers: [reportsinisterController],
      providers: [
        SinisterUseCase,
        {
          provide: SinisterUseCase,
          useValue: {
            get: jest.fn(),
            findAll: jest.fn(),
            findAllSinisterFromUser: jest.fn(),
            findAllSinisterFromQuote: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<reportsinisterController>(reportsinisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a message for contact form"', async () => {
    await expect(controller.contactForm()).resolves.toHaveProperty(
      'message',
      'Please fill this form to report us a sinister',
    );
    await expect(controller.contactForm()).resolves.toHaveProperty(
      'notification',
      '',
    );
  });
});
