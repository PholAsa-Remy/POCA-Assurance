import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  index() {
    return { message: 'Get your home insured within 3 minutes!' };
  }
}
