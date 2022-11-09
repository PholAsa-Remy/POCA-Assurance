import { AuthController } from './auth.controller';
import { AuthUseCase } from '../usecase/auth.usecase';
import { Test } from '@nestjs/testing';

describe('AuthController', () => {
  let authController: AuthController;
  let authUseCase: AuthUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthUseCase,
        {
          provide: AuthUseCase,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authUseCase = moduleRef.get<AuthUseCase>(AuthUseCase);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
});
