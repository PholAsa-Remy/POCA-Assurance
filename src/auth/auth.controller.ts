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
  async loginPage() {
    return;
  }

  @Get('auth/signup')
  @Render('signup')
  async signUpPage() {
    return;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const login = await this.authUseCase.login(req.user);
    req.session.customerId = login.id;
    req.session.username = login.username;
    req.session.email = login.email;
    req.session.address = login.address;
    req.session.phoneNumber = login.phoneNumber;
    return login;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
