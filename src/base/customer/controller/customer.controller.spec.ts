import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerUseCase } from '../useCase/customer.usecase';
import { MailerService } from '@nestjs-modules/mailer';

describe('CustomerController', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        CustomerUseCase,
        {
          provide: CustomerUseCase,
          useValue: {
            findOneById: jest.fn(),
            findOneByName: jest.fn(),
            findByEmail: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
        MailerService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
