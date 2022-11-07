import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { MailerService } from '@nestjs-modules/mailer';

describe('ContactController', () => {
  let controller: ContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailerService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
      controllers: [ContactController],
    }).compile();

    controller = module.get<ContactController>(ContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a message for contact form"', async () => {
    await expect(controller.contactForm()).resolves.toHaveProperty(
      'message',
      'Please fill this form to contact us.',
    );
    await expect(controller.contactForm()).resolves.toHaveProperty(
      'notification',
      '',
    );
  });
});
