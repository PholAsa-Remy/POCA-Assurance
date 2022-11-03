import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Render,
  Inject,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { LocalAuthGuard } from './local/local-auth.guard';
import { AuthUseCase } from './auth.usecase';

/* Auth Controller manage the routes for authentication */
@Controller()
export class AuthController {
  @Inject(AuthUseCase)
  private authUseCase: AuthUseCase;

  @Get('auth/login')
  @Render('login')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async loginPage() {}

  @Get('auth/signup')
  @Render('signup')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async signUpPage() {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authUseCase.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
