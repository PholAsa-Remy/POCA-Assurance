import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { CreateSinisterReportCommand } from '../command/sinister.command';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('report_sinister')
export class reportsinisterController {
  @Get('')
  @Render('reportsinister')
  async contactForm() {
    return {
      message: 'Please fill this form to report us a sinister',
      notification: '',
    };
  }

  @Post('report')
  @Render('reportsinister')

  async checkvalidity(@Body() data: CreateSinisterReportCommand) {

    //console.log(data)
    
    return {
      message: 'Please fill this form to report us a sinister',
      notification:
        'This type of sinister is covered by our services !' +
        'If you have an account a notification has been transmitted to our services.',
    };
  }
}
