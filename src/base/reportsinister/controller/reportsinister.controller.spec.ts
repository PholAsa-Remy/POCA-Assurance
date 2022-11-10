import { Test, TestingModule } from '@nestjs/testing';
import { reportsinisterController } from './reportsinister.controller';

describe('reportsinisterController', () => {
  let controller: reportsinisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [reportsinisterController],
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
