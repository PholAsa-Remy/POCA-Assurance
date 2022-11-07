import { Body, Controller, Get, Inject, Post, Render } from '@nestjs/common';
import { SendMailCommand } from '../command/contact.command';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('contact')
export class ContactController {
  @Inject(MailerService)
  private readonly mailerService: MailerService;

  @Get('')
  @Render('contact')
  async contactForm() {
    return {
      message: 'Please fill this form to contact us.',
      notification: '',
    };
  }

  @Post('send')
  @Render('contact')
  async sendMail(@Body() data: SendMailCommand) {
    this.sendContactMail(data);

    return {
      message: 'Please fill this form to contact us.',
      notification: 'Your message has been sent !',
    };
  }

  private sendContactMail(data: SendMailCommand) {
    this.mailerService.sendMail({
      to: 'kevindang@hotmail.fr',
      from: '"Galaxy Support" <kevin.dang01@proton.me>',
      subject: data.subject,
      text: `Name: ${data.username}; \nEmail: ${data.email}; \nPhone number: ${data.phoneNumber}; \nContent: ${data.message}`,
    });
  }
}
