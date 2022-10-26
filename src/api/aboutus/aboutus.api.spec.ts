import { Test, TestingModule } from '@nestjs/testing';
import { AboutusApi } from './aboutus.api';

describe('AboutusApi', () => {
  let app: TestingModule;

    
  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AboutusApi],
    }).compile();
  });

  describe('Check that the page is accessible', () => {
    it('should return without raising an error', () => {
      const theAPI = app.get<AboutusApi>(AboutusApi);
      const mockapianswer = jest.fn(() => theAPI.answerrequest() );
      expect(mockapianswer).not.toThrowError();
    });
  });
});
