import { Test, TestingModule } from '@nestjs/testing';
import { AboutUsController } from './aboutus.controller';

describe('AboutUsController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AboutUsController],
    }).compile();
  });

  describe('Check that the page is accessible', () => {
    it('should return without raising an error', () => {
      const theAPI = app.get<AboutUsController>(AboutUsController);
      const mockapianswer = jest.fn(() => theAPI.answerRequest());
      expect(mockapianswer).not.toThrowError();
    });
  });
});
