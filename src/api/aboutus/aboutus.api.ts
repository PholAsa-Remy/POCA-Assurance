import {
  Controller,
  Get,
  Render,
} from '@nestjs/common';

@Controller('about')
export class AboutusApi {

  @Get()
  @Render('aboutus')
  async answerrequest() {}

}
