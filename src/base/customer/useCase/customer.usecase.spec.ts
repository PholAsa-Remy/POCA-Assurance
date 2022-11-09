import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerUseCase } from './customer.usecase';
import { Customer } from '../entity/customer.entity';

describe('CustomerUseCase', () => {
  let customerUseCase: CustomerUseCase;
  let customerRepository: Repository<Customer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CustomerUseCase,
        {
          provide: getRepositoryToken(Customer),
          useClass: Repository,
        },
      ],
    }).compile();

    customerUseCase = module.get<CustomerUseCase>(CustomerUseCase);
    customerRepository = module.get<Repository<Customer>>(
      getRepositoryToken(Customer),
    );
  });

  it('should be defined', () => {
    expect(customerUseCase).toBeDefined();
  });
});
