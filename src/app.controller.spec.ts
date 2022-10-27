import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();
  });

  describe('get Index', () => {
    it('should return a catchphrase', () => {
      const quoteController = app.get<AppController>(AppController);
      expect(quoteController.index()).toEqual({
        message: 'Get your home insured within 3 minutes!',
      });
    });
  });
});
