import { Test, TestingModule } from '@nestjs/testing';
import { PdfService } from './pdf.service';
import { Customer } from '../../customer/entity/customer.entity';
import { Quote } from '../../quote/entity/quote.entity';

describe('UserHomeService', () => {
  let pdfService: PdfService;
  const customer: Customer = {
    id: 'test',
    username: 'test',
    password: 'test',
    address: 'test',
    email: 'test',
    phoneNumber: 'test',
    quotes: null,
  };
  const quote: Quote = {
    id: 'test',
    customer: null,
    customerId: '1',
    basePrice: 1,
    includeBreakDownAndRescue: true,
    includeDamageToSelf: true,
    includeDamageFromThirdParty: true,
    deductionDamageToSelf: 1,
    deductionDamageFromThirdParty: 1,
    priceBreakDownAndRescue: 1,
    isSubscribe: true,
    createdAt: null,
    updatedAt: null,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [PdfService],
    }).compile();

    pdfService = module.get<PdfService>(PdfService);
  });

  it('should be defined', () => {
    expect(pdfService).toBeDefined();
  });

  it('should be defined', () => {
    expect(pdfService.generateContract(customer, quote)).toBeDefined();
  });
});
