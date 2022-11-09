import { Controller, Get, Render } from '@nestjs/common';

@Controller('about')
export class AboutUsController {
  @Get()
  @Render('aboutus')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async answerRequest() {}
}
