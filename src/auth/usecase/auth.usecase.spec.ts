import { Test, TestingModule } from '@nestjs/testing';
import { AuthUseCase } from './auth.usecase';
import { CustomerUseCase } from '../../base/customer/useCase/customer.usecase';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '../../base/customer/entity/customer.entity';

describe('AuthUseCase', () => {
  let authUseCase: AuthUseCase;
  let customerUseCase: CustomerUseCase;
  let jwtService: JwtService;
  let customer: Customer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuthUseCase,
        CustomerUseCase,
        JwtService,
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
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    const moduleCustomer: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        Customer,
        {
          provide: Customer,
          useValue: {
            password: 'pass',
          },
        },
      ],
    }).compile();

    authUseCase = module.get<AuthUseCase>(AuthUseCase);
    customerUseCase = module.get<CustomerUseCase>(CustomerUseCase);
    jwtService = module.get<JwtService>(JwtService);
    customer = moduleCustomer.get<Customer>(Customer);
  });

  it('should be defined', () => {
    expect(authUseCase).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a user on correct password', async () => {
      jest
        .spyOn(customerUseCase, 'findOneByName')
        .mockResolvedValueOnce(customer);
      const result = await authUseCase.validateUser('uname', 'pass');
      expect(result).toBeDefined();
    });
    it('should return null on incorrect password', async () => {
      jest
        .spyOn(customerUseCase, 'findOneByName')
        .mockResolvedValueOnce(customer);
      const result = await authUseCase.validateUser('uname', 'wrong');
      expect(result).toBeNull();
    });
    it('should return null on non existing user', async () => {
      jest.spyOn(customerUseCase, 'findOneByName').mockResolvedValueOnce(null);
      const result = await authUseCase.validateUser('wrong', 'pass');
      expect(result).toBeNull();
    });
  });
});
