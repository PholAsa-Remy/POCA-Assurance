import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { SendMailCommand } from '../command/contact.command';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('contact')
export class ContactController {
  constructor(private mailService: MailerService) {}

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
    await this.mailService.sendMail({
      to: 'kevindang@hotmail.fr',
      from: '"Galaxy Support" <kevin.dang01@proton.me>',
      subject: data.subject,
      text: `Name: ${data.username}; \nEmail: ${data.email}; \nPhone number: ${data.phoneNumber}; \nContent: ${data.message}`,
    });

    return {
      message: 'Please fill this form to contact us.',
      notification: 'Your message has been sent !',
    };
  }
}
